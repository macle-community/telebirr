import React from 'react'
import { View } from '@tarojs/components'
import { MauiIcon } from '@macle-community/taro-plugin-macle/components-react'

// QR Scanner vector icon (masked via MAUI Icon)
const SCAN_QR_ICON =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiPgogIDxwYXRoIGQ9Ik0gMTgwIDM2MCBWIDI2MCBBIDgwIDgwIDAgMCAxIDI2MCAxODAgSCAzNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI4MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHBhdGggZD0iTSA2NjQgMTgwIEggNzY0IEEgODAgODAgMCAwIDEgODQ0IDI2MCBWIDM2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmMyYzJjIiBzdHJva2Utd2lkdGg9IjgwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICA8cGF0aCBkPSJNIDE4MCA2NjQgViA3NjQgQSA4MCA4MCAwIDAgMCAyNjAgODQ0IEggMzYwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyYzJjMmMiIHN0cm9rZS13aWR0aD0iODAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0gNjY0IDg0NCBIIDc2NCBBIDgwIDgwIDAgMCAwIDg0NCA3NjQgViA2NjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI4MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHBhdGggZD0iTSAzMzAgNTAwIFYgMzgwIEEgNzAgNzAgMCAwIDEgNDAwIDMxMCBIIDYyNCBBIDcwIDcwIDAgMCAxIDY5NCAzODAgViA1MDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSI3MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPHJlY3QgeD0iMjYwIiB5PSI1ODAiIHdpZHRoPSI1MDQiIGhlaWdodD0iOTAiIHJ4PSI0NSIgZmlsbD0iIzJjMmMyYyIvPgo8L3N2Zz4='

export interface ScanQRFabProps {
  onClick: () => void
  bottom?: string
  right?: string
  className?: string
}

export default function ScanQRFab({
  onClick,
  bottom = '76px',
  right = '16px',
  className = 'absolute z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition'
}: ScanQRFabProps) {
  return (
    <View
      onClick={onClick}
      className={className}
      style={{
        bottom,
        right,
        backgroundColor: '#0084ff',
        boxShadow: '0 4px 16px rgba(0, 132, 255, 0.45), 0 2px 6px rgba(0, 0, 0, 0.15)'
      }}
    >
      <MauiIcon name={SCAN_QR_ICON} size="30px" color="#ffffff" />
    </View>
  )
}
