import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

const products = [
  { id: 'yirgacheffe', name: 'Yirgacheffe' },
  { id: 'sidama', name: 'Sidama' },
]

export default function CatalogLesson() {
  function openProduct(id: string) {
    return Taro.navigateTo({
      url: `/pages/product/index?id=${encodeURIComponent(id)}`,
    })
  }

  return (
    <View>
      <Text>Choose a coffee</Text>
      {products.map((product) => (
        <View key={product.id}>
          <Text>{product.name}</Text>
          <Button onClick={() => openProduct(product.id)}>View details</Button>
        </View>
      ))}
    </View>
  )
}
