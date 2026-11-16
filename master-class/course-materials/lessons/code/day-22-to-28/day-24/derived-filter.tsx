import { useMemo, useState } from 'react'
import { Input, Text, View } from '@tarojs/components'

const products = [
  { id: 'yirgacheffe', name: 'Yirgacheffe' },
  { id: 'sidama', name: 'Sidama' },
  { id: 'jimma', name: 'Jimma' },
]

export default function DerivedFilterLesson() {
  const [query, setQuery] = useState('')
  const visibleProducts = useMemo(() => {
    const term = query.trim().toLocaleLowerCase()
    return products.filter((product) => product.name.toLocaleLowerCase().includes(term))
  }, [query])

  return (
    <View>
      <Input value={query} onInput={(event) => setQuery(event.detail.value)} />
      {visibleProducts.map((product) => <Text key={product.id}>{product.name}</Text>)}
      <Text>For three static rows memoization is not needed; measure larger workloads.</Text>
    </View>
  )
}
