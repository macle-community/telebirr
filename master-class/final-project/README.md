# EthioShop capstone

EthioShop is a teaching demo for an Ethiopian coffee shop. It demonstrates a Taro catalog, a cart, and a backend-created **mock** order.

> **No real payment is processed.** The checkout endpoint deliberately returns a demo status. Do not treat it as a Telebirr integration or deploy it to production. Real payments require approved merchant onboarding and current provider documentation; transaction creation and verification belong on the backend.

## Run locally

Terminal 1 — backend:

```sh
cd final-project/backend
npm test
npm start
```

Terminal 2 — frontend:

```sh
cd final-project/frontend
npm install
npm run typecheck
npm run build:macle
npm run sim:macle
```

The backend listens on `http://127.0.0.1:8787` by default. If the simulator cannot reach loopback, set `API_BASE_URL` in `frontend/src/config.ts` to a host address reachable from the simulator, then rebuild. For testing from another device, run the backend with `HOST=0.0.0.0` and use the development machine's LAN address. Only do this on a trusted network. Use HTTPS and a hardened, authenticated backend for any real deployment.

## Structure

```text
backend/     Node.js demo API and tests
frontend/    React + Taro Macle Mini App
```

## What to build next

1. Add product detail and order history pages.
2. Persist carts and orders in a database.
3. Add authentication using the approved platform flow.
4. Replace the mock checkout only after merchant onboarding; verify provider callbacks/status server-side and add idempotency.
5. Test the final package on supported devices.
