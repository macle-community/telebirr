import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'

export default function DemoEntitlementLesson() {
  const [demoUnlocked, setDemoUnlocked] = useState(false)

  return (
    <View>
      <Text>Premium roast notes — course demo</Text>
      {demoUnlocked
        ? <Text>Mock premium content. This is not a paid entitlement.</Text>
        : <Text>Locked in this local demo.</Text>}
      <Button onClick={() => setDemoUnlocked((value) => !value)}>
        Toggle mock state
      </Button>
      <Text>
        Client state is user-controlled. A real feature must be authorized by
        the backend using a verified entitlement.
      </Text>
    </View>
  )
}
