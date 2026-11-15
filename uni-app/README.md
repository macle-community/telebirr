# Telebirr UniApp

This Vue 3 uni-app project is the WeChat Mini Program conversion of the existing Taro app. The original Taro source remains in the repository unchanged.

## Setup and build

```sh
npm install
npm run dev:mp-weixin
npm run build:mp-weixin
npm run dev:macle
npm run build:macle
npm run sim:macle
```

Open the generated `dist/dev/mp-weixin` or `dist/build/mp-weixin` directory in WeChat DevTools. Macle output is written to `dist/dev/macle` or `dist/build/macle`; the adapter emits `.maml` templates, `.mass` styles, and Macle `ma:` directives. `npm run sim:macle` serves the build in the Macle web simulator at port 30005.

The Macle runtime forwards UniApp mini-program API calls to the native `ma` global. APIs absent from Macle raise an explicit error when called. Configure the production WeChat app ID in `src/manifest.json` before publishing.

The AI assistant attempts to connect to the existing development service at `http://localhost:8000`. Configure an HTTPS request domain for real WeChat devices. Airtime and money operations in this UI are demonstrations and do not process real payments.
