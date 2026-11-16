import { Text, View } from '@tarojs/components'

const fictionalPickupPoints = [
  { id: 'demo-1', name: 'Demo Coffee Counter', area: 'Addis Ababa · fictional' },
  { id: 'demo-2', name: 'Sample Roastery', area: 'Hawassa · fictional' },
]

export default function PickupPointsLesson() {
  return (
    <View>
      <Text>Sample pickup points</Text>
      <Text>Fictional data only. No device location is requested.</Text>
      {fictionalPickupPoints.map((point) => (
        <View key={point.id}>
          <Text>{point.name}</Text>
          <Text>{point.area}</Text>
        </View>
      ))}
    </View>
  )
}
