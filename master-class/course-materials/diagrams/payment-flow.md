# Payment flow: trusted boundaries

This diagram describes the **demo architecture**. The capstone uses a simulated checkout and does not initiate a real Telebirr transaction.

```mermaid
sequenceDiagram
  participant App as Mini App
  participant API as Merchant backend
  participant Pay as Approved payment provider
  App->>API: Request order for selected items
  API-->>App: Order ID and amount
  App->>Pay: Start provider-approved checkout (production only)
  Pay-->>App: User-facing result
  Pay->>API: Provider callback or status notification
  API->>Pay: Verify status using server credentials
  App->>API: Query order status
  API-->>App: Backend-verified order state
```

Do not trust a client success callback as proof of payment. Keep signing keys on the backend, verify provider notifications/status server-side, make order updates idempotent, and never request or store a payment PIN in app code.
