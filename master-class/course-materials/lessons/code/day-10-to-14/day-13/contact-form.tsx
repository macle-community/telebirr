import { useState } from 'react'
import { Button, Input, Text, Textarea, View } from '@tarojs/components'

export default function ContactFormLesson() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const valid = name.trim().length > 0 && message.trim().length > 0

  function submit() {
    setSubmitted(false)
    if (!valid) {
      setError('Enter your name and a message.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <View>
      <Text>Name</Text>
      <Input
        value={name}
        placeholder="Fictional demo name"
        onInput={(event) => setName(event.detail.value)}
      />
      <Text>Message</Text>
      <Textarea
        value={message}
        maxlength={300}
        placeholder="Write a short demo message"
        onInput={(event) => setMessage(event.detail.value)}
      />
      {error && <Text>{error}</Text>}
      {submitted && <Text>Demo form submitted.</Text>}
      <Button disabled={!valid} onClick={submit}>Submit demo form</Button>
      <Text>Do not enter payment PINs or sensitive personal information.</Text>
    </View>
  )
}
