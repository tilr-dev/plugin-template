// The plugin: one window type, named after the plugin, drawn with the DOM. A heading, a button
// and a click counter. The count lives in the plugin's store area, so it survives a reload of the
// plugin and of the page.
//
// 'tilr' and 'tilr/ui' come from the page (its import map) and are never bundled; a relative
// import (./lib.js) or an npm library is bundled into dist/index.js by `tilr-plugin build`.
import { definePlugin } from 'tilr'
import { element, frame } from 'tilr/ui'
import { clickLabel, readCount } from './lib.js'

/** The plugin's name: must equal package.json `tilr.name` (`npx tilr-plugin init` sets both).
 *  It names the plugin, its store area, its window type and the window's CSS class. */
const NAME = 'hello'

/** The store key of the count, in the area named after the plugin. */
const COUNT = 'count'

export default definePlugin({
  // No `version` / `api`: the build stamps them (package.json's version, ^ the SDK's API).
  name: NAME,
  // Every service the plugin touches: `ctx` has exactly these, and the plugin waits for them.
  inject: ['ui', 'windows', 'store'],
  apply(ctx) {
    // The plugin's own namespace of keys in the store (JSON values).
    const store = ctx.store.area(NAME)

    // Styles leave with the plugin. Theme tokens only (var(--accent)), never literal colors.
    ctx.ui.style(`
      .${NAME}-tile .body { display: flex; flex-direction: column; align-items: flex-start; gap: var(--gap); }
      .${NAME}-tile .count { color: var(--muted); }
    `)

    ctx.windows.register(NAME, {
      title: 'Hello',
      open: 'once', // the layout opens one window the first time it meets the type
      singleton: true, // opening it again focuses the one there is
      mount(host, win) {
        // The standard frame: title bar (the drag handle), float / tile and close, body.
        const { tile, body, dispose } = frame(win, { className: `${NAME}-tile` })
        const heading = element('h1', '', 'Hello from a Tilr plugin')
        const count = element('div', 'count')
        // Every control has a name for agents (aria-label) and the method it calls (data-call).
        const button = element('button', '', 'Click me')
        button.setAttribute('aria-label', 'count a click')
        button.dataset.call = 'store.set'
        button.addEventListener('click', () => store.set(COUNT, readCount(store.get(COUNT)) + 1))
        body.append(heading, button, count)

        const draw = () => {
          count.textContent = clickLabel(readCount(store.get(COUNT)))
        }
        draw()
        // Redraw on every change of the key: this window's clicks, another tab's, a reset.
        const unwatch = store.watch(COUNT, draw)
        host.append(tile)
        // The undo: runs when the window closes or the plugin unloads.
        return () => {
          unwatch()
          dispose()
        }
      },
    })
  },
})
