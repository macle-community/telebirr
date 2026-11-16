import { useEffect, useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface Task {
  id: string
  title: string
  completed: boolean
}

const storageKey = 'course.todo.v1'

function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every((task) =>
    task !== null &&
    typeof task === 'object' &&
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.completed === 'boolean',
  )
}

function readTasks(): Task[] {
  try {
    const stored: unknown = Taro.getStorageSync(storageKey)
    return isTaskList(stored) ? stored : []
  } catch (error) {
    console.error('Could not read the demo task list:', error)
    return []
  }
}

export default function TodoPageLesson() {
  const [tasks, setTasks] = useState<Task[]>(readTasks)
  const [title, setTitle] = useState('')
  const [storageMessage, setStorageMessage] = useState('')

  useEffect(() => {
    try {
      Taro.setStorageSync(storageKey, tasks)
      setStorageMessage('')
    } catch (error) {
      console.error('Could not save the demo task list:', error)
      setStorageMessage('Could not save. Tasks are available for this session only.')
    }
  }, [tasks])

  function addTask() {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    setTasks((current) => [
      ...current,
      { id: `${Date.now()}-${current.length}`, title: trimmedTitle, completed: false },
    ])
    setTitle('')
  }

  return (
    <View>
      <Text>Demo to-do list</Text>
      <Input
        value={title}
        maxlength={80}
        placeholder="Add a task"
        onInput={(event) => setTitle(event.detail.value)}
      />
      <Button disabled={!title.trim()} onClick={addTask}>Add task</Button>
      {storageMessage && <Text>{storageMessage}</Text>}
      {tasks.map((task) => (
        <View key={task.id}>
          <Text>{task.completed ? 'Done: ' : ''}{task.title}</Text>
          <Button
            onClick={() => setTasks((current) => current.map((item) =>
              item.id === task.id ? { ...item, completed: !item.completed } : item,
            ))}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </Button>
          <Button onClick={() => setTasks((current) =>
            current.filter((item) => item.id !== task.id),
          )}>
            Remove
          </Button>
        </View>
      ))}
    </View>
  )
}
