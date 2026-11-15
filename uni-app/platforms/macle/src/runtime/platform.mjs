import { ma } from './api.mjs'

export function getBaseSystemInfo() {
  return ma.getSystemInfoSync()
}
