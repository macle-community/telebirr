import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AirtimePackage } from '../../types'
import { DEFAULT_PACKAGES } from '../../apis/queryPackages'

export interface PackageCardProps {
  data?: {
    packages?: AirtimePackage[]
  }
  onSelectPackage?: (pkg: AirtimePackage) => void
}

export default function PackageCard({ data, onSelectPackage }: PackageCardProps) {
  const packages = data?.packages || DEFAULT_PACKAGES
  const [selectedId, setSelectedId] = useState<string>(packages[0]?.id || 'p1')

  const handleSelect = (pkg: AirtimePackage) => {
    setSelectedId(pkg.id)
    if (onSelectPackage) {
      onSelectPackage(pkg)
    }
  }

  const handleBuy = (pkg: AirtimePackage) => {
    Taro.navigateTo({
      url: `/packageAirtime/pages/index?tab=package&pkgId=${pkg.id}`
    })
  }

  return (
    <View className="w-full bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm my-2">
      <View className="flex flex-row items-center justify-between pb-2 border-b border-gray-100 mb-2.5">
        <Text className="text-xs font-bold text-gray-900">Recommended Packages</Text>
        <Text className="text-[10px] text-gray-500 font-medium">Ethio Telecom 4G</Text>
      </View>

      <View className="space-y-2 mb-3">
        {packages.map(pkg => {
          const isSelected = selectedId === pkg.id
          return (
            <View
              key={pkg.id}
              onClick={() => handleSelect(pkg)}
              className={`p-2.5 rounded-xl border transition cursor-pointer flex flex-row items-center justify-between ${
                isSelected
                  ? 'border-[#76bc21] bg-emerald-50/40 shadow-xs'
                  : 'border-gray-200 bg-gray-50/50'
              }`}
            >
              <View className="flex-1 pr-2">
                <View className="flex flex-row items-center space-x-1.5">
                  <Text className="text-xs font-bold text-gray-900">{pkg.name}</Text>
                  <Text className="bg-[#76bc21]/15 text-[#5ea315] text-[9px] font-semibold px-1.5 py-0.2 rounded">
                    {pkg.tag}
                  </Text>
                </View>
                <Text className="text-[10px] text-gray-500 mt-0.5">
                  Quota: {pkg.quota} • Validity: {pkg.validity}
                </Text>
              </View>
              <View className="flex flex-col items-end">
                <View className="flex flex-row items-baseline">
                  <Text className="text-sm font-black text-[#76bc21]">{pkg.price}</Text>
                  <Text className="text-[9px] text-gray-500 ml-0.5">ETB</Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>

      <View
        onClick={() => {
          const current = packages.find(p => p.id === selectedId) || packages[0]
          if (current) handleBuy(current)
        }}
        className="w-full bg-[#76bc21] active:opacity-90 py-2.5 rounded-xl flex items-center justify-center cursor-pointer shadow-xs"
      >
        <Text className="text-white text-xs font-bold tracking-wide">
          Activate Selected Package
        </Text>
      </View>
    </View>
  )
}

