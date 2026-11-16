# Taro to Macle: practical notes

| Taro concept | What to check in a Macle build |
| --- | --- |
| `View`, `Text`, `Image`, `Input` | Confirm the component is supported by the installed plugin and runtime |
| React state and event handlers | Build, then test event and state updates in the simulator |
| `Taro.navigateTo` and related APIs | Verify route registration, path format, and query handling |
| `Taro.request` | Configure an allowed backend host and test failure behavior |
| `Taro.setStorageSync` | Confirm persistence and storage limits on the target |
| Styles and responsive units | Inspect generated styles and validate on multiple device sizes |
| Custom components | Check generated component registration and required platform configuration |

The compiler output is useful for debugging, but should not become an application dependency. Prefer documented Taro APIs where the plugin supports them and use native APIs only through a deliberate, tested adapter.
