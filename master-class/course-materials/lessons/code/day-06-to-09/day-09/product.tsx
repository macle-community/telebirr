import { useMemo } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'

const products = [
  { id: 'yirgacheffe', name: 'Yirgacheffe', origin: 'Gedeo, Ethiopia' },
  { id: 'sidama', name: 'Sidama', origin: 'Sidama, Ethiopia' },
]

export default function ProductLesson() {
  const router = useRouter()
  const product = useMemo(
    () => products.find((item) => item.id === router.params.id),
    [router.params.id],
  )

  if (!product) {
    return (
      <View>
        <Text>Product not found.</Text>
        <Button onClick={() => Taro.navigateBack()}>Back to catalog</Button>
      </View>
    )
  }

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.origin}</Text>
      <Button onClick={() => Taro.navigateBack()}>Back to catalog</Button>
    </View>
  )
}
