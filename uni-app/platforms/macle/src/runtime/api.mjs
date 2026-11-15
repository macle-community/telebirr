function getNativeApi() {
  if (typeof globalThis !== 'undefined' && globalThis.ma) {
    return globalThis.ma
  }
  throw new Error('Macle native API global "ma" is not available')
}

const nativeApi = new Proxy(Object.create(null), {
  get(_target, property) {
    if (typeof property === 'symbol') {
      return undefined
    }

    const api = getNativeApi()
    const value = api[property]
    if (value === undefined) {
      return (..._args) => {
        throw new Error(`Macle does not implement native API "${property}"`)
      }
    }
    return typeof value === 'function' ? value.bind(api) : value
  },
  has(_target, property) {
    return property in getNativeApi()
  },
  ownKeys() {
    return Reflect.ownKeys(getNativeApi())
  },
  getOwnPropertyDescriptor(_target, property) {
    const descriptor = Object.getOwnPropertyDescriptor(getNativeApi(), property)
    return descriptor ? { ...descriptor, configurable: true } : undefined
  },
  set(_target, property, value) {
    return Reflect.set(getNativeApi(), property, value)
  },
})

if (typeof globalThis !== 'undefined') {
  globalThis.wx = nativeApi
}

export { nativeApi as ma, nativeApi as wx }
