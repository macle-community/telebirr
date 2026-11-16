import { useMemo, useState } from 'react'
import { Input, Text, View } from '@tarojs/components'

const products = [
  { id: 'yirgacheffe', name: 'Yirgacheffe', origin: 'Gedeo' },
  { id: 'sidama', name: 'Sidama', origin: 'Sidama' },
  { id: 'jimma', name: 'Jimma', origin: 'Oromia' },
]

export default function FilterableListLesson() {
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return products.filter((product) =>
      `${product.name} ${product.origin}`.toLocaleLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <View>
      <Input
        value={query}
        placeholder="Search coffees"
        onInput={(event) => setQuery(event.detail.value)}
      />
      {filteredProducts.length === 0
        ? <Text>No matching coffees.</Text>
        : filteredProducts.map((product) => (
          <View key={product.id}>
            <Text>{product.name}</Text>
            <Text>{product.origin}</Text>
          </View>
        ))}
    </View>
  )
}
