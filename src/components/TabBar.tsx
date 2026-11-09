import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

export type TabType = 'home' | 'payment' | 'apps' | 'engage' | 'account'

interface TabBarProps {
  activeTab: TabType
  onTabChange?: (tab: TabType) => void
}

// SVG vector icon for Home tab (masked via MAUI Icon)
const HOME_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9IiMyYzJjMmMiIGQ9Ik05NDYuMyA1MDVMNTM0LjYgOTMuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBMNzcuNyA1MDVjLTEyIDEyLTEyLjUgMzEuMy0xLjIgNDMuOSAxMS44IDEzLjIgMzIuMSAxMy43IDQ0LjUgMS4zTDE2MCA1MTEuMlY5MDRjMCAyMi4xIDE3LjkgNDAgNDAgNDBoMjAwYzIyLjEgMCA0MC0xNy45IDQwLTQwVjY4MGgxNDR2MjI0YzAgMjIuMSAxNy45IDQwIDQwIDQwaDIwMGMyMi4xIDAgNDAtMTcuOSA0MC00MFY1MTEuMmwzOSAzOWM2LjIgNi4yIDE0LjQgOS40IDIyLjYgOS40IDcuNyAwIDE1LjQtMi44IDIxLjQtOC41IDEyLjEtMTIuNiAxMS42LTMyLjktLjctNDYuMXoiLz48L3N2Zz4='

const TAB_CONFIG: { id: TabType; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: HOME_ICON },
  { id: 'payment', label: 'Payment', icon: 'shopping' },
  { id: 'apps', label: 'Apps', icon: 'classification' },
  { id: 'engage', label: 'Engage', icon: 'dialogue' },
  { id: 'account', label: 'Account', icon: 'setting' }
]

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const handleTabClick = (tab: TabType) => {
    if (tab === activeTab) return
    if (onTabChange) {
      onTabChange(tab)
    } else {
      const url = `/pages/${tab}/index`
      Taro.reLaunch({
        url,
        fail: () => {
          Taro.redirectTo({
            url,
            fail: () => {
              Taro.navigateTo({ url })
            }
          })
        }
      })
    }
  }

  return (
    <View className="fixed bottom-0 left-0 right-0 z-50 select-none bg-[#76bc21] shadow-lg border-t border-[#68a81d]">
      <View className="relative w-full h-[62px] flex flex-row items-center justify-around px-1">
        {TAB_CONFIG.map((item) => {
          const isActive = item.id === activeTab
          return (
            <View
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className="flex-1 flex flex-col items-center justify-center cursor-pointer relative py-1"
            >
              {isActive ? (
                /* Active Tab with Elevated Circular Notch */
                <View className="flex flex-col items-center -mt-5 transition-transform duration-200">
                  <View className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border-2 border-[#76bc21] active:scale-95 transition-transform duration-150">
                    <MauiIcon name={item.icon} size="24px" color="#76bc21" />
                  </View>
                  <View className="w-1.5 h-1.5 bg-white rounded-full mt-1 mb-0.5" />
                  <Text className="text-white font-bold text-xs tracking-tight">
                    {item.label}
                  </Text>
                </View>
              ) : (
                /* Inactive Tab */
                <View className="flex flex-col items-center justify-center py-1 transition-opacity duration-200 opacity-90 active:opacity-60">
                  <MauiIcon name={item.icon} size="22px" color="rgba(255, 255, 255, 0.9)" />
                  <Text className="text-white/90 font-medium text-xs mt-1 tracking-tight">
                    {item.label}
                  </Text>
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}
