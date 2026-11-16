import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'

type CapabilityState = 'not-checked' | 'available' | 'denied' | 'unavailable'

export default function CapabilityDemoLesson() {
  const [state, setState] = useState<CapabilityState>('not-checked')

  return (
    <View>
      <Text>Device capability exercise (mock only)</Text>
      <Text>
        {state === 'not-checked' && 'No device API has been called.'}
        {state === 'available' && 'Mock capability is available.'}
        {state === 'denied' && 'Mock permission was denied. Use the fallback.'}
        {state === 'unavailable' && 'This runtime has no verified implementation.'}
      </Text>
      <Button onClick={() => setState('available')}>Simulate available</Button>
      <Button onClick={() => setState('denied')}>Simulate denial</Button>
      <Button onClick={() => setState('unavailable')}>Simulate unavailable</Button>
    </View>
  )
}
