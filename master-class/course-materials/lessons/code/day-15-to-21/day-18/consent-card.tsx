import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'

export default function ConsentCardLesson() {
  const [consented, setConsented] = useState(false)

  return (
    <View>
      <Text>Demo profile access</Text>
      <Text>
        This mock exercise would use a display name to personalize a greeting.
        No profile data is requested or sent.
      </Text>
      <Button onClick={() => setConsented(true)}>Continue with mock data</Button>
      <Button onClick={() => setConsented(false)}>Cancel</Button>
      <Text>{consented ? 'Mock consent granted for this screen.' : 'No consent given.'}</Text>
    </View>
  )
}
