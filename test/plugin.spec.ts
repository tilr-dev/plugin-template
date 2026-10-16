// e2e on WebKit (the Mac app's engine): the plugin alone on the core's built page, shipped in
// @tilr-dev/plugin. globalSetup (the SDK's Playwright config) builds dist/ first. The site serves
// what the plugin needs: 'store', a theme, 'layout' (windows are the layout's), then the plugin,
// mounted from dist/.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import type { Site } from '@tilr-dev/plugin/test'
import { coreSite, serveSite, tilr } from '@tilr-dev/plugin/test'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))
/** The plugin's name, from package.json (`tilr.name`): also its window type and store area. */
const PKG = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { tilr: { name: string } }
const NAME = PKG.tilr.name

let site: Site
test.beforeEach(async () => {
  site = await serveSite({
    site: coreSite(),
    plugins: ['store', 'theme', 'layout', NAME],
    overlays: { [NAME]: DIST },
  })
})
test.afterEach(() => site.close())

/** The count as the page's store holds it. */
const storedCount = (page: Page) => page.evaluate(name => window.tilr.root.get('store')?.area(name).get('count'), NAME)

test('opens the Hello window; a click counts and the count survives a reload', async ({ page }) => {
  const t = tilr(page)
  await t.open(site)
  await t.waitForState(NAME, 'active')

  const win = page.locator(`.window[data-type="${NAME}"]`)
  await expect(win.locator('header')).toHaveText('Hello')
  await expect(win.getByRole('heading')).toHaveText('Hello from a Tilr plugin')
  await expect(win.locator('.count')).toHaveText('Clicked 0 times')

  const button = win.getByRole('button', { name: 'count a click' })
  await button.click()
  await expect(win.locator('.count')).toHaveText('Clicked 1 time')
  await button.click()
  await expect(win.locator('.count')).toHaveText('Clicked 2 times')
  expect(await storedCount(page)).toBe(2)

  // The count is in the store: it survives a reload of the page.
  await page.reload()
  await t.waitForState(NAME, 'active')
  await expect(win.locator('.count')).toHaveText('Clicked 2 times')

  expect(t.consoleErrors()).toEqual([])
})
