import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AirtimeOrder, PaymentResult } from '../../types'

export interface OrderReceiptCardProps {
  data?: AirtimeOrder | PaymentResult
  onConfirmPay?: () => void
}

export default function OrderReceiptCard({ data, onConfirmPay }: OrderReceiptCardProps) {
  if (!data) return null

  const isResult = 'success' in data
  const orderId = data.orderId
  const amount = data.amount
  const recipientPhone = isResult
    ? (data as PaymentResult).recipientPhone
    : (data as AirtimeOrder).recipient.formattedPhone
  const timestamp = isResult
    ? (data as PaymentResult).timestamp
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const handleOpenDetail = () => {
    Taro.navigateTo({ url: '/pages/transaction-history/index' })
  }

  return (
    <View className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm my-2">
      {/* Status Header */}
      <View className="flex flex-col items-center justify-center pb-3 border-b border-gray-100">
        <View className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1.5">
          <Text className="text-xl text-[#76bc21]">✓</Text>
        </View>
        <Text className="text-sm font-bold text-gray-900">
          {isResult ? 'Recharge Successful' : 'Order Ready for Payment'}
        </Text>
        <View className="flex flex-row items-baseline mt-1">
          <Text className="text-2xl font-black text-gray-900">{amount.toFixed(2)}</Text>
          <Text className="text-xs font-semibold text-gray-500 ml-1">ETB</Text>
        </View>
      </View>

      {/* Breakdown Details */}
      <View className="py-3 space-y-1.5 text-xs">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-500">Service</Text>
          <Text className="font-semibold text-gray-800">Airtime / Package Top-Up</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-gray-500">Recipient</Text>
          <Text className="font-semibold text-gray-900 font-mono">{recipientPhone}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-gray-500">Order ID</Text>
          <Text className="font-medium text-gray-700 font-mono text-[11px]">{orderId}</Text>
        </View>
        {isResult && (data as PaymentResult).transactionId && (
          <View className="flex flex-row justify-between">
            <Text className="text-gray-500">Transaction Ref</Text>
            <Text className="font-medium text-gray-700 font-mono text-[11px]">
              {(data as PaymentResult).transactionId}
            </Text>
          </View>
        )}
        <View className="flex flex-row justify-between">
          <Text className="text-gray-500">Payment Account</Text>
          <Text className="font-semibold text-gray-800">telebirr Wallet</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-gray-500">Timestamp</Text>
          <Text className="font-medium text-gray-600">{timestamp}</Text>
        </View>
      </View>

      {/* Actions */}
      <View className="pt-2 border-t border-gray-100 flex flex-row gap-2">
        {isResult ? (
          <View
            onClick={handleOpenDetail}
            className="w-full py-2 rounded-xl bg-gray-100 text-center font-bold text-xs text-gray-700 cursor-pointer active:bg-gray-200"
          >
            View Transaction Details
          </View>
        ) : (
          <View
            onClick={onConfirmPay}
            className="w-full py-2.5 rounded-xl bg-[#76bc21] text-center font-bold text-xs text-white cursor-pointer active:opacity-90 shadow-xs"
          >
            Confirm & Pay {amount.toFixed(2)} ETB
          </View>
        )}
      </View>
    </View>
  )
}

