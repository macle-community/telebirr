import { useState } from 'react'
import { Button, Text, View } from '@tarojs/components'

type ScreenState =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; message: string }

export default function RequestStateLesson() {
  const [state, setState] = useState<ScreenState>({ kind: 'loading' })

  return (
    <View>
      <Text>Request state demo</Text>
      {state.kind === 'loading' && <Text>Loading…</Text>}
      {state.kind === 'empty' && <Text>No items yet.</Text>}
      {state.kind === 'error' && <Text>{state.message}</Text>}
      {state.kind === 'ready' && <Text>{state.message}</Text>}
      <Button onClick={() => setState({ kind: 'loading' })}>Show loading</Button>
      <Button onClick={() => setState({ kind: 'empty' })}>Show empty</Button>
      <Button onClick={() => setState({ kind: 'error', message: 'Could not load. Try again.' })}>
        Show error
      </Button>
      <Button onClick={() => setState({ kind: 'ready', message: 'Three products loaded.' })}>
        Show success
      </Button>
    </View>
  )
}
