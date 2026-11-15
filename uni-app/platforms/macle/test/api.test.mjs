import assert from 'node:assert/strict'
import test from 'node:test'

test('wx forwards native Macle API calls and reports unavailable APIs', async () => {
  const calls = []
  globalThis.ma = {
    getSystemInfoSync() {
      calls.push(this)
      return { platform: 'macle' }
    },
  }

  const { wx, ma } = await import('../src/runtime/api.mjs')

  assert.deepEqual(wx.getSystemInfoSync(), { platform: 'macle' })
  assert.equal(calls[0], globalThis.ma)
  assert.equal(wx, ma)
  assert.equal(globalThis.wx, wx)
  assert.throws(() => wx.unsupportedApi(), /Macle does not implement native API/)
})
