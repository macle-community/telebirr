import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createServer } from './server.mjs'

let server
let baseUrl

before(async () => {
  server = createServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

test('lists products and creates an order using server-calculated prices', async () => {
  const productResponse = await fetch(`${baseUrl}/api/products`)
  assert.equal(productResponse.status, 200)
  const listedProducts = await productResponse.json()
  assert.equal(listedProducts.length, 3)

  const orderResponse = await fetch(`${baseUrl}/api/demo-checkout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      items: [{ productId: 'yirgacheffe', quantity: 2 }],
      totalCents: 1,
    }),
  })
  assert.equal(orderResponse.status, 201)
  const order = await orderResponse.json()
  assert.equal(order.totalCents, 37000)
  assert.equal(order.status, 'DEMO_PAID')
  assert.equal(order.simulated, true)

  const statusResponse = await fetch(`${baseUrl}/api/orders/${order.id}`)
  assert.equal(statusResponse.status, 200)
  assert.equal((await statusResponse.json()).id, order.id)
})

test('rejects invalid quantities and unknown products', async () => {
  for (const item of [
    { productId: 'sidama', quantity: 0 },
    { productId: 'not-real', quantity: 1 },
  ]) {
    const response = await fetch(`${baseUrl}/api/demo-checkout`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items: [item] }),
    })
    assert.equal(response.status, 400)
    assert.ok((await response.json()).error)
  }
})
