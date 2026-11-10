import { ModelContextResponse, PaymentResult } from '../types'

export interface PayAirtimeOrderParams {
  orderId: string
  pin?: string
}

export async function payAirtimeOrder(
  params: PayAirtimeOrderParams
): Promise<ModelContextResponse<PaymentResult>> {
  const { orderId } = params

  if (!orderId) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: 'Order ID is required to execute payment.'
        }
      ]
    }
  }

  // Generate real-looking transaction reference
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`
  const initialBalance = 855.08
  // Default fallback amount if order lookup in memory is simulated
  const amount = 100.0
  const newBalance = Math.max(0, initialBalance - amount)
  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const result: PaymentResult = {
    success: true,
    orderId,
    transactionId,
    amount,
    currency: 'ETB',
    recipientPhone: '+251 905410217',
    newBalance,
    timestamp,
    message: `Airtime recharge of ${amount.toFixed(2)} ETB completed successfully.`
  }

  return {
    isError: false,
    content: [
      {
        type: 'text',
        text: `Payment successful! Transaction ID: ${transactionId}. Recharged ${amount.toFixed(2)} ETB. Your remaining telebirr balance is ${newBalance.toFixed(2)} ETB.`
      },
      {
        type: 'card',
        data: result
      }
    ],
    structuredContent: result
  }
}

