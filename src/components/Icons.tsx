import React from 'react'
import { View } from '@tarojs/components'

// Common SVG Icon wrapper component for Taro
interface IconProps {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}

export function IconSearch({ size = 20, color = '#ffffff', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function IconBell({ size = 20, color = '#ffffff', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function IconEye({ size = 18, color = '#ffffff', open = true, className = '' }: IconProps & { open?: boolean }) {
  if (!open) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function IconSendMoney({ size = 32, color = '#76bc21' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="26" height="18" rx="3" />
      <path d="M13 18h10" />
      <path d="M22 6l5 4-5 4" />
      <path d="M27 10H14" />
      <circle cx="18" cy="19" r="2" fill={color} />
    </svg>
  )
}

export function IconCashInOut({ size = 32, color = '#76bc21' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="26" height="18" rx="3" />
      <circle cx="14" cy="19" r="3" />
      <path d="M25 15v8" />
      <path d="M21 19h8" />
    </svg>
  )
}

export function IconAirtime({ size = 32, color = '#76bc21' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="13" width="24" height="17" rx="2" />
      <path d="M18 13v17" />
      <path d="M4 18h28" />
      <path d="M14 8c-3 0-5 2-2 5 3 0 6-3 6-5s-1-2-4 0z" />
      <path d="M22 8c3 0 5 2 2 5-3 0-6-3-6-5s1-2 4 0z" />
      <circle cx="10" cy="5" r="1" fill="#f59e0b" stroke="none" />
      <circle cx="26" cy="6" r="1.5" fill="#f59e0b" stroke="none" />
      <circle cx="6" cy="9" r="0.8" fill="#f59e0b" stroke="none" />
    </svg>
  )
}

export function IconTransferBank({ size = 32, color = '#76bc21' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11l14-7 14 7" />
      <line x1="6" y1="11" x2="30" y2="11" />
      <line x1="8" y1="15" x2="8" y2="25" />
      <line x1="14" y1="15" x2="14" y2="25" />
      <line x1="22" y1="15" x2="22" y2="25" />
      <line x1="28" y1="15" x2="28" y2="25" />
      <rect x="4" y="25" width="28" height="4" rx="1" />
    </svg>
  )
}

export function IconScanQR({ size = 22, color = '#ffffff' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="3" height="3" fill={color} />
      <rect x="14" y="7" width="3" height="3" fill={color} />
      <rect x="7" y="14" width="3" height="3" fill={color} />
      <line x1="14" y1="14" x2="17" y2="14" />
      <line x1="14" y1="17" x2="17" y2="17" />
    </svg>
  )
}

export function IconLocationPin({ size = 26, color = '#76bc21' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill={color} />
    </svg>
  )
}

export function IconChevronRight({ size = 18, color = '#9ca3af' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function IconChevronDown({ size = 18, color = '#9ca3af' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconChevronUp({ size = 18, color = '#ffffff' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

export function IconArrowLeft({ size = 22, color = '#111827' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

export function IconMenu({ size = 22, color = '#ffffff' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function IconDownload({ size = 20, color = '#4b5563' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function IconFilter({ size = 20, color = '#4b5563' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

export function IconFingerprint({ size = 32, color = '#76bc21', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M11 38V24C11 16.82 16.82 11 24 11C31.18 11 37 16.82 37 24V38" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M16 38V24C16 19.58 19.58 16 24 16C28.42 16 32 19.58 32 24V38" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M20 38V25C20 22.79 21.79 21 24 21C26.21 21 28 22.79 28 25V38" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="24" cy="27" r="1.4" fill={color} />
      <path d="M24 31V38" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}

