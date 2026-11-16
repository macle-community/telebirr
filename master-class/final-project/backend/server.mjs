import { randomUUID } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { createServer as createHttpServer } from 'node:http'

export const products = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    origin: 'Gedeo, Ethiopia',
    description: 'Floral aroma with citrus notes.',
    priceCents: 18500,
  },
  {
    id: 'sidama',
    name: 'Sidama',
    origin: 'Sidama, Ethiopia',
    description: 'Bright, balanced, and gently sweet.',
    priceCents: 16250,
  },
  {
    id: 'jimma',
    name: 'Jimma',
    origin: 'Oromia, Ethiopia',
    description: 'A rich, chocolate-toned daily cup.',
    priceCents: 14000,
  },
]

const orders = new Map()
const maxBodyBytes = 16 * 1024

function sendJson(response, status, value) {
  response.writeHead(status, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  response.end(JSON.stringify(value))
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > maxBodyBytes) {
      const error = new Error('Request body is too large')
      error.statusCode = 413
      throw error
    }
  }

  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Request body must be valid JSON')
    error.statusCode = 400
    throw error
  }
}

function createDemoOrder(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    const error = new Error('Add at least one product')
    error.statusCode = 400
    throw error
  }
  if (payload.items.length > products.length) {
    const error = new Error('Too many line items')
    error.statusCode = 400
    throw error
  }

  const seen = new Set()
  let totalCents = 0
  for (const item of payload.items) {
    if (
      !item ||
      typeof item.productId !== 'string' ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 10
    ) {
      const error = new Error('Each item needs a productId and quantity from 1 to 10')
      error.statusCode = 400
      throw error
    }
    if (seen.has(item.productId)) {
      const error = new Error('Use one line per product')
      error.statusCode = 400
      throw error
    }
    seen.add(item.productId)

    const product = products.find(({ id }) => id === item.productId)
    if (!product) {
      const error = new Error(`Unknown product: ${item.productId}`)
      error.statusCode = 400
      throw error
    }
    totalCents += product.priceCents * item.quantity
  }

  const order = {
    id: randomUUID(),
    totalCents,
    status: 'DEMO_PAID',
    simulated: true,
    createdAt: new Date().toISOString(),
  }
  orders.set(order.id, order)
  return order
}

export function createServer() {
  return createHttpServer(async (request, response) => {
    if (request.method === 'OPTIONS') {
      response.writeHead(204, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
      })
      response.end()
      return
    }

    const url = new URL(request.url ?? '/', 'http://localhost')
    try {
      if (request.method === 'GET' && url.pathname === '/api/products') {
        sendJson(response, 200, products)
        return
      }

      if (request.method === 'POST' && url.pathname === '/api/demo-checkout') {
        sendJson(response, 201, createDemoOrder(await readJson(request)))
        return
      }

      const orderMatch = url.pathname.match(/^\/api\/orders\/([0-9a-f-]+)$/i)
      if (request.method === 'GET' && orderMatch) {
        const order = orders.get(orderMatch[1])
        sendJson(response, order ? 200 : 404, order ?? { error: 'Order not found' })
        return
      }

      sendJson(response, 404, { error: 'Not found' })
    } catch (error) {
      const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500
      if (status === 500) console.error('Demo API request failed:', error)
      sendJson(response, status, { error: status === 500 ? 'Internal server error' : error.message })
    }
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const host = process.env.HOST || '127.0.0.1'
  const port = Number(process.env.PORT || 8787)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer from 1 to 65535')
  }
  createServer().listen(port, host, () => {
    console.log(`EthioShop demo API listening on http://${host}:${port}`)
  })
}
