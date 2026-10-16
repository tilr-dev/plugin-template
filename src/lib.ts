// Pure helpers: no DOM, no 'tilr' import, so `node --test` loads them as they are
// (src/lib.test.ts). The build bundles this file into dist/index.js with the rest.

/** The count as the store holds it. What comes back from storage is untrusted JSON (an older
 *  version, a hand edit): anything but a non-negative integer counts as 0. */
export function readCount(value: unknown): number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : 0
}

/** The line under the button: "Clicked 1 time", "Clicked 3 times". */
export function clickLabel(count: number): string {
  return `Clicked ${count} ${count === 1 ? 'time' : 'times'}`
}
