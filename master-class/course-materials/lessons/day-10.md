# Day 10 — Macle network requests and host APIs

**Estimated time:** 5–10 minute reading, 30 minute request lab  
**Goal:** You load server data with visible request states.
**Source:** [Day 10 request state example](./code/day-10-to-14/day-10/catalog-loader.tsx) ·
[EthioShop backend](../../final-project/backend/server.mjs)

## In simple words

Instead of typing products into the screen, the app asks a server for them.
While it waits, it should say so. If the server cannot answer, it should show
an error and let the person try again.

## Key concepts

An API call crosses a trust and failure boundary. The app may have no
network, the server may be unavailable, or a response may be malformed.
Every request-backed screen needs a loading state, a success state, and a
failure state. The user should never have to guess whether a tap worked.

Taro offers APIs that the target plugin may map to platform capabilities.
That does not mean every API is supported in every Macle version. Confirm
the exact signature, host allowlist, permission rules, and simulator behavior
for this course environment. Keep service credentials on the server. An app
bundle is inspectable by its users.

Treat a request as a sequence of explicit states rather than a single
success/failure boolean:

```text
loading -> ready(products)
        -> error(message) -> retry -> loading
```

For example, an HTTP 200 response with the wrong data shape should still
enter the error state. A server error is not an empty catalog, and a
connection timeout does not prove that an order was never created.

## Step-by-step tutorial

Run the EthioShop backend and request `GET /api/products`. Inspect the
response shape and the frontend's `API_BASE_URL`. Trace the app's state flow:
loading starts, a valid 2xx response populates products, and a rejected or
invalid response sets an error.

```tsx
const response = await Taro.request({
  url: `${API_BASE_URL}/api/products`,
  method: 'GET',
})
if (response.statusCode < 200 || response.statusCode >= 300) {
  throw new Error(`Request failed (${response.statusCode})`)
}
```

## Practice

Add a small status panel that requests the catalog. Display “Loading…”
before the response, the number of products after success, and a retry action
after failure. Stop the local backend and observe the failure state.

## Review questions

Check whether HTTP 500 is the same as a successful response with an empty list.
It is not. Check whether a client-side timeout proves the server did not create
an order. It does not; the result may be ambiguous and needs a status query.

## Apply it

Document one expected success response and two failure responses. Add a
malformed-response case to your UI test notes and explain how the screen
recovers.

## Macle request-state tutorial: step by step

Use the [request state example](./code/day-10-to-14/day-10/catalog-loader.tsx).
Before writing
the request, inspect the backend's `GET /api/products` route and copy its
response shape into your notes. The page then follows a deliberate sequence:

1. Verify the request API and host/allowlist requirements for the installed
   Macle runtime; do not assume a Taro wrapper is supported.
2. Set `loading` before starting the request so the user sees immediate
   feedback.
3. Await the verified request adapter, then check its HTTP status; transport success does not
   make an HTTP 500 a successful catalog response.
4. Validate the response shape before rendering it. A 200 response with a
   missing `products` array is still an application error.
5. On success, store the data and clear the previous error. On failure,
   retain an actionable message and a retry path.
6. Test success, server error, stopped server, and malformed JSON/shape. Stop
   the backend intentionally for the connection failure case.

Treat a timeout around an order-creating request differently from a failed
catalog read: the server may have completed the order even if the client did
not receive the response. A production system needs an idempotency strategy
and an order-status lookup rather than blindly retrying.
