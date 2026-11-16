import { Button, Text, View } from '@tarojs/components'
import './index.css'

export default function ResponsiveCardLesson() {
  return (
    <View className="lesson-page">
      <Text className="lesson-eyebrow">DAY 6 · RESPONSIVE LAYOUT</Text>
      <Text className="lesson-title">Coffee from Ethiopia</Text>
      <Text className="lesson-intro">
        A card should adapt to its container and keep its text readable.
      </Text>

      <View className="coffee-card">
        <View className="coffee-card__mark">
          <Text>☕</Text>
        </View>
        <View className="coffee-card__body">
          <Text className="coffee-card__name">Yirgacheffe</Text>
          <Text className="coffee-card__origin">Gedeo, Ethiopia</Text>
          <Text className="coffee-card__description">
            Floral aroma, citrus notes, and a clean finish.
          </Text>
          <Text className="coffee-card__price">185.00 ETB</Text>
        </View>
      </View>

      <Button className="lesson-button">Explore the layout</Button>
      <Text className="lesson-footnote">
        Resize the simulator and check for clipped text or horizontal scroll.
      </Text>
    </View>
  )
}
