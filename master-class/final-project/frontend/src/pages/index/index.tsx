import { useEffect, useMemo, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { API_BASE_URL } from '../../config'
import './index.css'

interface Product {
  id: string
  name: string
  origin: string
  description: string
  priceCents: number
}

interface CartItem {
  productId: string
  quantity: number
}

interface DemoOrder {
  id: string
  totalCents: number
  status: 'DEMO_PAID'
  simulated: true
}

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every((item) =>
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.origin === 'string' &&
    typeof item.description === 'string' &&
    Number.isInteger(item.priceCents),
  )
}

function isDemoOrder(value: unknown): value is DemoOrder {
  if (!value || typeof value !== 'object') return false
  const order = value as Record<string, unknown>
  return typeof order.id === 'string' &&
    Number.isInteger(order.totalCents) &&
    order.status === 'DEMO_PAID' &&
    order.simulated === true
}

function formatPrice(cents: number) {
  return `${(cents / 100).toFixed(2)} ETB`
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastOrder, setLastOrder] = useState<DemoOrder | null>(null)

  useEffect(() => {
    let active = true
    Taro.request({ url: `${API_BASE_URL}/api/products`, method: 'GET' })
      .then((response) => {
        if (response.statusCode < 200 || response.statusCode >= 300 || !isProductList(response.data)) {
          throw new Error('The product service returned an invalid response.')
        }
        if (active) {
          setProducts(response.data)
          setErrorMessage('')
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setErrorMessage(error instanceof Error ? error.message : 'Could not load products.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const totalCents = useMemo(() => cart.reduce((total, item) => {
    const product = products.find(({ id }) => id === item.productId)
    return total + (product?.priceCents ?? 0) * item.quantity
  }, 0), [cart, products])

  function addToCart(product: Product) {
    setCart((items) => {
      const existing = items.find((item) => item.productId === product.id)
      if (existing) {
        return items.map((item) => item.productId === product.id
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
          : item)
      }
      return [...items, { productId: product.id, quantity: 1 }]
    })
    setLastOrder(null)
  }

  async function checkout() {
    if (cart.length === 0 || submitting) return
    setSubmitting(true)
    setErrorMessage('')
    try {
      const response = await Taro.request({
        url: `${API_BASE_URL}/api/demo-checkout`,
        method: 'POST',
        header: { 'content-type': 'application/json' },
        data: { items: cart },
      })
      if (response.statusCode !== 201 || !isDemoOrder(response.data)) {
        throw new Error('The demo checkout did not return a valid order.')
      }
      setLastOrder(response.data)
      setCart([])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not create the demo order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <View className="shop">
      <View className="hero">
        <Text className="hero-kicker">ETHIOPIAN COFFEE</Text>
        <Text className="hero-title">A good cup, from home.</Text>
        <Text className="hero-copy">A small demo shop built with React and Taro.</Text>
      </View>

      <View className="section-heading">
        <Text className="section-title">Coffee selection</Text>
        <Text className="section-note">{products.length} roasts</Text>
      </View>

      {loading && <Text className="notice">Loading products…</Text>}
      {!loading && errorMessage && <Text className="error">{errorMessage}</Text>}
      {!loading && !errorMessage && products.length === 0 && (
        <Text className="notice">No products are available.</Text>
      )}

      {products.map((product) => {
        const quantity = cart.find((item) => item.productId === product.id)?.quantity ?? 0
        return (
          <View className="product-card" key={product.id}>
            <View className="coffee-mark"><Text>☕</Text></View>
            <View className="product-info">
              <Text className="product-name">{product.name}</Text>
              <Text className="product-origin">{product.origin}</Text>
              <Text className="product-description">{product.description}</Text>
              <Text className="product-price">{formatPrice(product.priceCents)}</Text>
            </View>
            <Button className="add-button" onClick={() => addToCart(product)}>
              {quantity > 0 ? `Add (${quantity})` : 'Add'}
            </Button>
          </View>
        )
      })}

      <View className="checkout-card">
        <View className="checkout-row">
          <Text className="checkout-label">Demo cart</Text>
          <Text className="checkout-total">{formatPrice(totalCents)}</Text>
        </View>
        <Text className="demo-warning">Demo only — no payment is processed.</Text>
        <Button
          className="checkout-button"
          disabled={cart.length === 0 || submitting}
          onClick={checkout}
        >
          {submitting ? 'Creating order…' : 'Place demo order'}
        </Button>
        {lastOrder && (
          <Text className="success">
            Demo order {lastOrder.id.slice(0, 8)} created · {formatPrice(lastOrder.totalCents)}
          </Text>
        )}
      </View>
    </View>
  )
}
