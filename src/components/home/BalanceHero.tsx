import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

// Eye vector icons (open / closed) for balance privacy toggle
const EYE_OPEN_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyYzJjMmMiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yIDEyQzQuNSA3LjUgOC41IDYuNSAxMiA2LjVTMTkuNSA3LjUgMjIgMTJDMTkuNSAxNi41IDE1LjUgMTcuNSAxMiAxNy41UzQuNSAxNi41IDIgMTJaIiAvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIuNiIgZmlsbD0iIzJjMmMyYyIgc3Ryb2tlPSJub25lIiAvPjwvc3ZnPg=='

const EYE_CLOSE_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyYzJjMmMiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yIDEyQzQuNSA3LjUgOC41IDYuNSAxMiA2LjVDMTQuMiA2LjUgMTYuNSA3IDE4LjUgOC41TTIyIDEyQzIwLjUgMTQuOCAxNy4yIDE3LjUgMTIgMTcuNUM4LjUgMTcuNSA0LjUgMTYuNSAyIDEyIiAvPjxwYXRoIGQ9Ik0xMC41IDEwLjVBMi42IDIuNiAwIDAgMCAxMy41IDEzLjUiIC8+PGxpbmUgeDE9IjMiIHkxPSIyMCIgeDI9IjIxIiB5Mj0iNCIgLz48L3N2Zz4='

export interface BalanceHeroProps {
  mainBalance?: string
  endekiseBalance?: string
  rewardBalance?: string
  onNavigateHistory: () => void
}

export default function BalanceHero({
  mainBalance = '855.08',
  endekiseBalance = '0.00',
  rewardBalance = '25.50',
  onNavigateHistory
}: BalanceHeroProps) {
  const [showMainBalance, setShowMainBalance] = useState(true)
  const [showEndekise, setShowEndekise] = useState(false)
  const [showReward, setShowReward] = useState(false)

  return (
    <View
      className="w-full flex-shrink-0 z-20 telebirr-header-bg telebirr-wave-texture px-4 pt-1 pb-4 relative shadow-xs"
      style={{
        backgroundColor: '#76bc21',
        backgroundImage:
          'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.22) 20%, transparent 25%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.16) 40%, transparent 45%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12) 60%, transparent 65%), radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08) 80%, transparent 85%)'
      }}
    >
      {/* Main Balance Header */}
      <View className="flex flex-col items-center justify-center pt-1">
        <View
          className="flex flex-row items-center justify-center space-x-1.5 cursor-pointer py-1"
          onClick={() => setShowMainBalance(!showMainBalance)}
        >
          <Text className="text-white text-base font-medium tracking-wide leading-none">
            Balance (ETB)
          </Text>
          <View className="flex items-center justify-center">
            <MauiIcon
              name={showMainBalance ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
              size="15px"
              color="#ffffff"
            />
          </View>
        </View>

        {/* Amount (Clickable to open Transaction History) */}
        <View
          className="cursor-pointer py-1 my-0.5 active:opacity-90"
          onClick={onNavigateHistory}
        >
          <Text className="text-white font-black text-4xl tracking-tight">
            {showMainBalance ? mainBalance : '******'}
          </Text>
        </View>

        {/* Sub Balances: Endekise & Reward */}
        <View className="w-full flex flex-row items-center justify-between px-6 pt-2">
          {/* Endekise */}
          <View className="flex flex-col items-start">
            <View
              className="flex flex-row items-center space-x-1 cursor-pointer py-0.5"
              onClick={() => setShowEndekise(!showEndekise)}
            >
              <Text className="text-white text-sm font-medium leading-none">
                Endekise (ETB)
              </Text>
              <View className="flex items-center justify-center">
                <MauiIcon
                  name={showEndekise ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                  size="13px"
                  color="#ffffff"
                />
              </View>
            </View>
            <Text className="text-white font-bold text-base mt-1">
              {showEndekise ? endekiseBalance : '******'}
            </Text>
          </View>

          {/* Reward */}
          <View className="flex flex-col items-end">
            <View
              className="flex flex-row items-center space-x-1 cursor-pointer py-0.5"
              onClick={() => setShowReward(!showReward)}
            >
              <Text className="text-white text-sm font-medium leading-none">
                Reward (ETB)
              </Text>
              <View className="flex items-center justify-center">
                <MauiIcon
                  name={showReward ? EYE_OPEN_ICON : EYE_CLOSE_ICON}
                  size="13px"
                  color="#ffffff"
                />
              </View>
            </View>
            <Text className="text-white font-bold text-base mt-1">
              {showReward ? rewardBalance : '******'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

