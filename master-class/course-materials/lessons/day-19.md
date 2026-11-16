# Day 19 — Securing Macle app integrations

**Estimated time:** 5–10 minute reading, 25 minute review lab  
**Goal:** You identify secrets and sensitive values that must not be
shipped in a client.
**Source:** [server-only config validation example](./code/day-15-to-21/day-19/server-config.example.mjs) ·
[EthioShop frontend](../../final-project/frontend/src/pages/index/index.tsx)

## Key concepts

A compiled Mini App is still client-side code. Minification does not make
secrets safe. Any merchant key, signing secret, payment PIN, or privileged
backend credential embedded in JavaScript can be recovered. The correct
place for server credentials is a protected backend environment or secret
manager with narrow access and rotation.

Storage is not a vault. Avoid storing sensitive tokens unless the platform
and security design explicitly permit it; prefer short-lived, scoped
credentials and server-side authorization. Logs also matter: a debug log can
leak authorization headers, personal information, or order data. Build a
habit of using fictional data and redacting sensitive values.

The server-side example fails fast when required configuration is missing:

```js
function requiredEnv(name, value) {
  if (!value || !value.trim()) {
    throw new Error(`Missing required server configuration: ${name}`)
  }
  return value.trim()
}
```

This helper belongs in backend code. Moving a value into a frontend `.env`
file does not make it secret; frontend build tools can embed it in the
downloadable app bundle.

## Step-by-step tutorial

Search the frontend source and compiled output for a fake marker such as
`DEMO_SECRET_DO_NOT_USE`. Explain that the marker is harmless but illustrates
how anything bundled can be inspected. Confirm that the backend receives
requests without requiring a credential in the frontend.

## Practice

Review the capstone for hardcoded credentials, PIN fields, verbose request
logging, and client-owned price authority. Create a checklist and fix any
unsafe teaching example found. Do not add real credentials to test the
scanner.

## Review questions

Classify each item: UI label, API base URL, signing key,
payment PIN, product display price, verified order state. The signing key
and PIN do not belong in the app; display price can be shown, but the server
owns the authoritative order amount/status.

## Apply it

Submit a short security review with one threat, impact, and mitigation for
the client, backend, and logs. Verify that no secret-like marker was added
to the final build.

## Macle integration security: step by step

Inspect the [configuration example](./code/day-15-to-21/day-19/server-config.example.mjs).
It fails fast when required server configuration is missing and keeps the
configuration shape on the backend. The sample value is a service URL, not a
merchant signing key; do not add real credentials to it.

1. Compare frontend and backend directories. Explain that frontend
   environment variables are compiled into client artifacts and are not
   secret.
2. Search the client for hardcoded credential-like values, debug request
   headers, and sensitive logs.
3. Inspect the built artifact as well as source: build-time substitutions can
   expose values that are absent from checked-in source.
4. Review the backend's request logs and response bodies for excess data.
5. Record a finding with file/line, risk, and an actionable correction.

The output is a short review checklist and does not require adding a scanner
or installing new security tooling.
