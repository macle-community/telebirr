import { Button, Text, View } from '@tarojs/components'
import './index.css'

const profile = {
  name: 'Demo User',
  role: 'Telebirr learner',
  location: 'Addis Ababa',
  memberSince: 'Course project',
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <View className="profile-detail">
      <Text className="profile-detail__label">{label}</Text>
      <Text className="profile-detail__value">{value}</Text>
    </View>
  )
}

export default function ProfileLesson() {
  return (
    <View className="profile-page">
      <Text className="profile-kicker">DAY 7 · MINI-PROJECT</Text>
      <View className="profile-card">
        <View className="profile-avatar"><Text>DU</Text></View>
        <Text className="profile-name">{profile.name}</Text>
        <Text className="profile-role">{profile.role}</Text>
        <View className="profile-divider" />
        <ProfileDetail label="Location" value={profile.location} />
        <ProfileDetail label="Member since" value={profile.memberSince} />
        <Button className="profile-action" disabled>
          Profile action (not connected)
        </Button>
      </View>
      <Text className="profile-note">
        Fictional course data only. This page does not display account data.
      </Text>
    </View>
  )
}
