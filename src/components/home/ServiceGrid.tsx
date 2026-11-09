import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

export interface ServiceItem {
  id: string
  name: string
  icon: any
  badge?: string | null
  action: () => void
}

export interface ServiceGridProps {
  services: ServiceItem[]
  columns?: number
  className?: string
}

export default function ServiceGrid({
  services,
  columns = 4,
  className = 'w-full px-3 pt-3 relative'
}: ServiceGridProps) {
  const gridColClass = columns === 4 ? 'grid-cols-4' : 'grid-cols-3'

  return (
    <View className={className}>
      <View className={`grid ${gridColClass} gap-2`}>
        {services.map((item) => (
          <View
            key={item.id}
            onClick={item.action}
            className="relative bg-white rounded-xl py-2 px-1 flex flex-col items-center justify-start telebirr-card-shadow active:bg-gray-50 cursor-pointer min-h-[96px]"
          >
            {/* Optional Promotional Badge (e.g. Up to 35%) */}
            {item.badge && (
              <View
                className="absolute -top-1.5 px-1.5 py-0.5 rounded-full z-10"
                style={{ backgroundColor: '#f59e0b' }}
              >
                <Text className="text-white font-bold text-[10px]">
                  {item.badge}
                </Text>
              </View>
            )}

            {/* Service Icon (Supports MauiIcon or Image) */}
            <View className="w-9 h-9 flex items-center justify-center mb-1">
              {item.id === 'more' ? (
                <MauiIcon name="add" size="28px" color="#76bc21" />
              ) : (
                <Image
                  src={item.icon}
                  mode="aspectFit"
                  style={{ width: '32px', height: '32px' }}
                />
              )}
            </View>

            {/* Service Label (Multi-line) */}
            <Text className="text-gray-800 text-xs font-semibold text-center leading-tight whitespace-pre-line">
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
