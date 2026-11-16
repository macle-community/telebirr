import { useEffect, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface Product {
  id: string
  name: string
  priceCents: number
}

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; products: Product[] }
  | { kind: 'error'; message: string }

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every((item) =>
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    Number.isInteger(item.priceCents),
  )
}

export default function CatalogLoaderLesson() {
  const [state, setState] = useState<LoadState>({ kind: 'loading' })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    setState({ kind: 'loading' })
    Taro.request({ url: 'http://127.0.0.1:8787/api/products', method: 'GET' })
      .then((response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          throw new Error(`Catalog request failed (${response.statusCode})`)
        }
        if (!isProductList(response.data)) {
          throw new Error('Catalog response has an unexpected shape')
        }
        if (active) setState({ kind: 'ready', products: response.data })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            kind: 'error',
            message: error instanceof Error ? error.message : 'Catalog request failed',
          })
        }
      })

    return () => {
      active = false
    }
  }, [reloadKey])

  if (state.kind === 'loading') {
    return <View><Text>Loading catalog…</Text></View>
  }
  if (state.kind === 'error') {
    return (
      <View>
        <Text>{state.message}</Text>
        <Button onClick={() => setReloadKey((key) => key + 1)}>Retry</Button>
      </View>
    )
  }
  if (state.products.length === 0) {
    return <View><Text>No products available.</Text></View>
  }

  return (
    <View>
      {state.products.map((product) => (
        <View key={product.id}>
          <Text>{product.name}</Text>
          <Text>{(product.priceCents / 100).toFixed(2)} ETB</Text>
        </View>
      ))}
    </View>
  )
}
