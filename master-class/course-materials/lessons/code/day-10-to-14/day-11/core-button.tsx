import { Button, Text, View } from '@tarojs/components'

export default function CoreComponentFallback() {
  return (
    <View>
      <Text>This screen uses a Taro core component.</Text>
      <Button>Continue</Button>
    </View>
  )
}
