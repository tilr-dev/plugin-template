// Unit tests: `npm run test:unit` (node --test; Node strips the types itself). Only what is pure
// goes here; the window itself is tested in the page (test/plugin.spec.ts).
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { clickLabel, readCount } from './lib.ts'

test('clickLabel: singular and plural', () => {
  assert.equal(clickLabel(0), 'Clicked 0 times')
  assert.equal(clickLabel(1), 'Clicked 1 time')
  assert.equal(clickLabel(2), 'Clicked 2 times')
})

test('readCount: a stored count, or 0 for anything else', () => {
  assert.equal(readCount(5), 5)
  assert.equal(readCount(undefined), 0)
  assert.equal(readCount('5'), 0)
  assert.equal(readCount(-1), 0)
  assert.equal(readCount(1.5), 0)
})
