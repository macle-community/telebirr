import { ModelContextResponse, RecipientInfo } from '../types'

export interface ValidateRecipientParams {
  phone: string
  type?: 'self' | 'other'
}

export async function validateRecipient(
  params: ValidateRecipientParams
): Promise<ModelContextResponse<RecipientInfo>> {
  const raw = (params?.phone || '').trim()
  const recipientType = params?.type || (raw.includes('905410217') ? 'self' : 'other')

  // Clean non-digit characters except leading plus
  let cleaned = raw.replace(/[^\d+]/g, '')

  // Normalize Ethiopian numbers
  // Format 1: +251 9XXXXXXXX or +251 7XXXXXXXX
  // Format 2: 09XXXXXXXX or 07XXXXXXXX
  // Format 3: 9XXXXXXXX or 7XXXXXXXX
  let digits = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned
  if (digits.startsWith('251')) {
    digits = digits.slice(3)
  }
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }

  // Validate Ethiopian mobile prefix (9 for Ethio Telecom mobile, 7 for Safaricom/Ethio Tel)
  const isValid = (digits.startsWith('9') || digits.startsWith('7')) && digits.length === 9

  if (!isValid) {
    const errorInfo: RecipientInfo = {
      phone: raw,
      formattedPhone: raw,
      type: recipientType,
      isValid: false,
      carrier: 'Ethio Telecom'
    }

    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Invalid Ethiopian phone number "${raw}". Please provide a 9-digit mobile number starting with 09 or +251 9 (e.g., 0911234567).`
        }
      ],
      structuredContent: errorInfo
    }
  }

  const formattedPhone = `+251 ${digits.slice(0, 1)}${digits.slice(1)}`
  const result: RecipientInfo = {
    phone: raw,
    formattedPhone,
    type: recipientType,
    isValid: true,
    carrier: 'Ethio Telecom'
  }

  return {
    isError: false,
    content: [
      {
        type: 'text',
        text: `Recipient validated: ${formattedPhone} (${recipientType === 'self' ? 'Self' : 'Other contact'}) on Ethio Telecom.`
      }
    ],
    structuredContent: result
  }
}

