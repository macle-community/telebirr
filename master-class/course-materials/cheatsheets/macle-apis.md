# Macle API notes

The Mini App uses the API surface exposed by its target runtime. Taro API wrappers and native `ma.*` APIs are not automatically interchangeable; verify the installed platform plugin and current official Macle documentation.

## Safe teaching pattern

```tsx
import Taro from '@tarojs/taro'

async function loadProducts() {
  Taro.showLoading({ title: 'Loading' })
  try {
    const response = await Taro.request({
      url: 'https://example.invalid/api/products',
      method: 'GET',
    })
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`Request failed (${response.statusCode})`)
    }
    return response.data
  } finally {
    Taro.hideLoading()
  }
}
```

Replace the example host before running. Handle request failures in the calling UI; never suppress errors or ship credentials in the client.

## API lesson checklist

- Verify API name, parameters, callbacks/promises, permissions, and minimum runtime version.
- Check behavior in both the simulator and a supported device.
- Add user-visible loading, success, cancel, and failure states.
- Keep authorization and payment secrets out of the Mini App.
- Do not teach `tradePay`, `getAuthCode`, location, camera, or storage calls as universally available until confirmed for the target runtime and account.
