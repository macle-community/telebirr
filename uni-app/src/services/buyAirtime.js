export const DEFAULT_PHONE = '+251 905410217'
export const WALLET_BALANCE = 855.08

export const DEFAULT_DENOMINATIONS = [
  { amount: 5, currency: 'ETB' },
  { amount: 10, currency: 'ETB' },
  { amount: 15, currency: 'ETB' },
  { amount: 25, currency: 'ETB' },
  { amount: 50, currency: 'ETB' },
  { amount: 100, currency: 'ETB', badge: '+30%', sub: 'Frequency 1', bonusRate: 0.3, bonusAmount: 30, highlight: true },
  { amount: 250, currency: 'ETB', badge: '+35%', sub: 'Frequency 1', bonusRate: 0.35, bonusAmount: 87.5, highlight: true },
  { amount: 500, currency: 'ETB' },
  { amount: 1000, currency: 'ETB' }
]

export const DEFAULT_PACKAGES = [
  { id: 'p1', name: 'Daily 100MB + 10 Mins', category: 'daily', validity: '24 Hours', price: 15, currency: 'ETB', quota: '100MB Data + 10 Voice Mins', tag: 'Popular' },
  { id: 'p2', name: 'Weekly 1GB Data', category: 'weekly', validity: '7 Days', price: 75, currency: 'ETB', quota: '1GB High Speed Data', tag: 'Best Value' },
  { id: 'p3', name: 'Monthly 5GB + 200 Mins', category: 'monthly', validity: '30 Days', price: 350, currency: 'ETB', quota: '5GB Data + 200 Voice Mins', tag: 'Recommended' },
  { id: 'p4', name: 'Unlimited Night Internet', category: 'night', validity: '00:00 - 06:00', price: 25, currency: 'ETB', quota: 'Unlimited Night Data', tag: 'Night' }
]

const pendingOrders = new Map()

function response(data, text) {
  return {
    isError: false,
    content: [{ type: 'text', text }, { type: 'card', data }],
    structuredContent: data
  }
}

export function queryAirtimeOptions(params = {}) {
  const data = {
    denominations: DEFAULT_DENOMINATIONS,
    balance: WALLET_BALANCE,
    defaultPhone: params.recipientPhone || DEFAULT_PHONE,
    promotions: [{ title: 'Airtime Bonus', description: 'Recharge 100 ETB get +30% extra airtime, 250 ETB get +35% extra airtime!' }]
  }
  return response(data, `Available airtime options. Your telebirr balance is ${WALLET_BALANCE.toFixed(2)} ETB.`)
}

export function queryPackages(params = {}) {
  const packages = params.category && params.category !== 'all'
    ? DEFAULT_PACKAGES.filter((item) => item.category === params.category)
    : DEFAULT_PACKAGES
  return response({ packages, total: packages.length }, `Found ${packages.length} Ethio Telecom package(s).`)
}

export function validateRecipient(params = {}) {
  const raw = String(params.phone || '').trim()
  const digits = raw.replace(/\D/g, '')
  const local = digits.startsWith('251') ? digits.slice(3) : digits.startsWith('0') ? digits.slice(1) : digits
  const isValid = /^[79]\d{8}$/.test(local)
  const recipient = {
    phone: raw,
    formattedPhone: isValid ? `+251 ${local}` : raw,
    type: params.type || (raw.includes('905410217') ? 'self' : 'other'),
    isValid,
    valid: isValid,
    carrier: 'Ethio Telecom'
  }
  return {
    isError: !isValid,
    content: [{ type: 'text', text: isValid ? `Recipient validated: ${recipient.formattedPhone}.` : `Invalid Ethiopian phone number "${raw}".` }],
    structuredContent: recipient
  }
}

export function createAirtimeOrder(params = {}) {
  const recipientResult = validateRecipient({ phone: params.recipientPhone, type: params.recipientType })
  if (!recipientResult.structuredContent?.isValid) {
    return { isError: true, content: recipientResult.content }
  }

  let amount
  let packageDetails
  if (params.serviceType === 'airtime') {
    amount = Number(params.amount || 100)
    if (!Number.isFinite(amount) || amount < 5) {
      return { isError: true, content: [{ type: 'text', text: 'Minimum airtime recharge amount is 5.00 ETB.' }] }
    }
  } else if (params.serviceType === 'package') {
    packageDetails = DEFAULT_PACKAGES.find((item) => item.id === params.packageId)
    if (!packageDetails) {
      return { isError: true, content: [{ type: 'text', text: `Package not found: ${params.packageId || ''}.` }] }
    }
    amount = packageDetails.price
  } else {
    return { isError: true, content: [{ type: 'text', text: 'Choose airtime or package service.' }] }
  }

  if (amount > WALLET_BALANCE) {
    return { isError: true, content: [{ type: 'text', text: `Insufficient balance. Required: ${amount.toFixed(2)} ETB; available: ${WALLET_BALANCE.toFixed(2)} ETB.` }] }
  }

  const denomination = DEFAULT_DENOMINATIONS.find((item) => item.amount === amount)
  const order = {
    orderId: `ORD-AIRTIME-${Date.now().toString(36).toUpperCase()}`,
    serviceType: params.serviceType,
    recipient: recipientResult.structuredContent,
    recipientPhone: recipientResult.structuredContent.formattedPhone,
    amount,
    bonusAmount: denomination?.bonusAmount || 0,
    bonusInfo: denomination?.bonusAmount ? `+${denomination.bonusAmount} ETB bonus airtime` : '',
    totalPayable: amount,
    currency: 'ETB',
    packageDetails,
    status: 'PENDING',
    createdAt: Date.now(),
    paymentAccount: `telebirr (${WALLET_BALANCE.toFixed(2)} ETB)`
  }
  pendingOrders.set(order.orderId, order)
  return response(order, `Order created for ${order.recipient.formattedPhone}. Total payable: ${amount.toFixed(2)} ETB.`)
}

export function payAirtimeOrder(params = {}) {
  if (params.confirmed !== true) {
    return { isError: true, content: [{ type: 'text', text: 'The user must confirm the order before payment.' }] }
  }
  const order = params.order || pendingOrders.get(params.orderId)
  if (!params.orderId || !order || order.orderId !== params.orderId) {
    return { isError: true, content: [{ type: 'text', text: 'A valid pending order is required.' }] }
  }
  pendingOrders.delete(order.orderId)
  const result = {
    success: true,
    orderId: order.orderId,
    transactionId: `TXN-${Date.now().toString().slice(-8)}`,
    amount: order.totalPayable,
    currency: 'ETB',
    recipientPhone: order.recipient.formattedPhone,
    newBalance: Math.max(0, WALLET_BALANCE - order.totalPayable),
    timestamp: new Date().toLocaleString(),
    message: `Demo payment of ${order.totalPayable.toFixed(2)} ETB completed.`
  }
  return response(result, result.message)
}

export function initializeBuyAirtimeSkill() {
  if (typeof wx === 'undefined' || !wx.modelContext || typeof wx.modelContext.createSkill !== 'function') return null
  const skill = wx.modelContext.createSkill('static/packageAirtime/skills/buyAirtime')
  const handlers = { queryAirtimeOptions, queryPackages, validateRecipient, createAirtimeOrder, payAirtimeOrder }
  Object.entries(handlers).forEach(([name, handler]) => skill.registerAPI(name, handler))
  return skill
}
