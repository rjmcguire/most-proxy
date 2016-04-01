/* eslint max-nested-callbacks: 0 */
/*global describe, it */
import assert from 'assert'
import {periodic} from 'most'
import {proxy} from '../../src/index'

describe('proxy', () => {
  it('should create a circular dependency', (done) => {
    const [attach, stream] = proxy()
    const expected = [0, 1, 2]
    stream.take(3)
      .observe(x => {
        assert.strictEqual(x, expected.shift())
      })
      .then(() => done())
      .catch(done)

    const original = periodic(10, 1).scan((x, y) => x + y, 0)

    attach(original)
  })
})