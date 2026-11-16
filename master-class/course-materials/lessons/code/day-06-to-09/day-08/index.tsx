import { useMemo, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import './index.css'

const priceCents = 18500

export default function QuantityLesson() {
  const [quantity, setQuantity] = useState(0)
  const totalCents = useMemo(() => priceCents * quantity, [quantity])

  function changeQuantity(delta: number) {
    setQuantity((current) => Math.max(0, Math.min(10, current + delta)))
  }

  return (
    <View className="quantity-page">
      <Text className="quantity-title">Day 8 · State and events</Text>
      <View className="quantity-card">
        <Text className="quantity-name">Yirgacheffe</Text>
        <Text className="quantity-copy">185.00 ETB per bag · maximum 10</Text>
        <View className="quantity-controls">
          <Button
            className="quantity-control"
            disabled={quantity === 0}
            onClick={() => changeQuantity(-1)}
          >
            −
          </Button>
          <Text className="quantity-value">{quantity}</Text>
          <Button
            className="quantity-control"
            disabled={quantity === 10}
            onClick={() => changeQuantity(1)}
          >
            +
          </Button>
        </View>
        <Text className="quantity-total">
          Estimate: {(totalCents / 100).toFixed(2)} ETB
        </Text>
        <Text className="quantity-note">
          Display estimate only. A server must calculate an actual order total.
        </Text>
      </View>
    </View>
  )
}
