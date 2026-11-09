import React from 'react'
import { View, Text, Image } from '@tarojs/components'

import iconSendIndividual from '../../assets/images/icon_send_individual.png'
import iconSendGroup from '../../assets/images/icon_send_group.png'

export interface SendMoneyModalProps {
  visible: boolean
  onClose: () => void
  onSelectIndividual: () => void
  onSelectGroup: () => void
}

export default function SendMoneyModal({
  visible,
  onClose,
  onSelectIndividual,
  onSelectGroup
}: SendMoneyModalProps) {
  if (!visible) return null

  return (
    <View
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-start pt-64 pl-4"
      onClick={onClose}
    >
      <View
        className="bg-white rounded-2xl shadow-2xl p-2 w-52 border border-gray-100 animate-in fade-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* To Individual */}
        <View
          onClick={onSelectIndividual}
          className="flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-50 cursor-pointer transition border-b border-gray-100"
        >
          <Image
            src={iconSendIndividual}
            className="w-7 h-7 object-contain"
          />
          <Text className="text-sm font-semibold text-gray-800">To Individual</Text>
        </View>

        {/* To Group */}
        <View
          onClick={onSelectGroup}
          className="flex items-center gap-3 px-3 py-3 rounded-xl active:bg-gray-50 cursor-pointer transition"
        >
          <Image
            src={iconSendGroup}
            className="w-7 h-7 object-contain"
          />
          <Text className="text-sm font-semibold text-gray-800">To Group</Text>
        </View>
      </View>
    </View>
  )
}
