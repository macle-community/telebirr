---
name: buyAirtime
version: 1.0.0
description: Query, validate, and prepare telebirr airtime and data-package orders.
triggers:
  - buy airtime
  - recharge mobile
  - buy data package
  - check airtime options
  - telebirr balance
---

# telebirr Buy Airtime Skill

Use the registered APIs to query airtime denominations and packages, validate the recipient, create an order, and pay for a pending order. Render the returned options and order details through the UniApp chat interface.

## Safety and business rules

- Default recipient: `+251 905410217` when the user has not supplied another number.
- Accept Ethiopian mobile formats such as `0911234567`, `9XXXXXXXX`, and `+2519XXXXXXXX`; validate before creating an order.
- Airtime minimum is 5 ETB. The 100 ETB denomination earns 30 ETB bonus airtime; 250 ETB earns 87.50 ETB.
- Packages: `p1` daily 100 MB + 10 minutes (15 ETB), `p2` weekly 1 GB (75 ETB), `p3` monthly 5 GB + 200 minutes (350 ETB), and `p4` night internet (25 ETB).
- Check the available balance before preparing an order. Do not prepare orders that exceed it.
- Before calling `payAirtimeOrder`, show the service, recipient, total, and any bonus, then obtain explicit user confirmation. Never request or transmit the user's wallet PIN through the assistant.
- This project currently simulates payment; do not describe the demo result as a real wallet transfer.

## API sequence

1. Use `queryAirtimeOptions` or `queryPackages` to retrieve current choices.
2. Use `validateRecipient` for the chosen number.
3. Use `createAirtimeOrder` to prepare a pending order.
4. After the user confirms the displayed summary, call `payAirtimeOrder` with that order's ID.
