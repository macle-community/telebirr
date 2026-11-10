---
name: buyAirtime
version: 1.0.0
description: Mobile airtime recharge and data/voice package purchase capability for telebirr Ethio Telecom users.
triggers:
  - buy airtime
  - top up phone
  - recharge mobile
  - buy data package
  - buy internet package
  - purchase voice minutes
  - airtime bonus
  - 充值话费
  - 购买流量包
  - የሞባይል ካርድ ሙላ
  - የኢንተርኔት ጥቅል ግዛ
---

# telebirr Buy Airtime Skill

## 1. Overview
The `buyAirtime` Skill enables AI Agents within the WeChat / Macle Mini Program ecosystem to intelligently process mobile airtime top-ups and internet/voice package subscriptions for Ethio Telecom telebirr subscribers. 

Users can execute recharges using conversational prompts in natural language (English, Amharic, Chinese), inspect bonus promotions, choose denominations, configure recipient phone numbers (self or contacts), and confirm payment securely using their telebirr balance (`855.08 ETB`).

---

## 2. Supported User Intents & Scenarios

| User Intent | Example Prompts | Target Atomic API |
|-------------|-----------------|-------------------|
| **Direct Airtime Recharge (Self)** | "Recharge 100 birr for my phone", "Top up 50 ETB", "充值 100 话费", "የ100 ብር ካርድ ሙላልኝ" | `createAirtimeOrder` -> `payAirtimeOrder` |
| **Recharge for Others** | "Send 25 ETB airtime to 0911234567", "Top up 50 birr for +251912345678" | `validateRecipient` -> `createAirtimeOrder` |
| **Query Promotions & Denominations** | "What airtime amounts have bonus?", "Show airtime options", "What are the recharge bonuses?" | `queryAirtimeOptions` |
| **Purchase Data/Voice Package** | "Buy 1GB weekly data", "I want 5GB monthly internet", "Subscribe to unlimited night internet", "የሳምንት 1GB ዳታ ጥቅል" | `queryPackages` -> `createAirtimeOrder` |
| **Inspect Balance for Airtime** | "Do I have enough balance to buy 250 ETB airtime?" | `queryAirtimeOptions` |

---

## 3. Atomic APIs & Tools (`mcp.json`)

The skill provides 5 standardized atomic interfaces:

1. **`queryAirtimeOptions`**
   - **Purpose**: Retrieves the 9 supported airtime denominations, cashback bonus rates (`+30%` on 100 ETB, `+35%` on 250 ETB), and available telebirr balance.
   - **UI Card**: Renders `components/airtime-card`.

2. **`queryPackages`**
   - **Purpose**: Retrieves active Ethio Telecom data, voice, and combo packages with duration, price, and quota.
   - **UI Card**: Renders `components/package-card`.

3. **`validateRecipient`**
   - **Purpose**: Normalizes local Ethiopian phone formats (`09XXXXXXXX`, `9XXXXXXXX`, `+2519XXXXXXXX`) to standard E.164 `+251 9XXXXXXXX`.

4. **`createAirtimeOrder`**
   - **Purpose**: Builds an order with calculated bonuses, total amount, and recipient metadata.
   - **UI Card**: Renders `components/order-receipt-card` in confirmation mode.

5. **`payAirtimeOrder`**
   - **Purpose**: Deducts payment from the user's telebirr wallet, updates balance, generates a unique transaction reference (`TXN-...`), and triggers receipt display.

---

## 4. Business Rules & Execution Trajectory

### Rule 1: Recipient Phone Resolution
- If the user prompt does **not** specify a recipient number (e.g. "Recharge 100 ETB"), default to the authenticated user's registered number: `+251 905410217` (`recipientType: 'self'`).
- If an explicit phone number is provided (e.g. "0911234567"), call `validateRecipient` to normalize the number and set `recipientType: 'other'`.

### Rule 2: Denomination & Bonus Mapping
Standard denominations: `5, 10, 15, 25, 50, 100, 250, 500, 1000 ETB`.
- **100 ETB**: Grants `+30%` bonus airtime (30.00 ETB extra).
- **250 ETB**: Grants `+35%` bonus airtime (87.50 ETB extra).
- Custom amounts (e.g. 70 ETB) are supported as long as they are greater than or equal to 5 ETB.

### Rule 3: Package Catalog Mapping
- `p1`: **Daily 100MB + 10 Mins** — 15 ETB, 24 Hours (`Popular`)
- `p2`: **Weekly 1GB Data** — 75 ETB, 7 Days (`Best Value`)
- `p3`: **Monthly 5GB + 200 Mins** — 350 ETB, 30 Days (`Recommended`)
- `p4`: **Unlimited Night Internet** — 25 ETB, 00:00 - 06:00 (`Night`)

### Rule 4: Payment Confirmation Safety
- AI **must** summarize the purchase (Amount in ETB, Recipient Number, Service Type, Bonus if any) and prompt the user for confirmation before executing `payAirtimeOrder`.
- If the user's telebirr balance is insufficient (`totalPayable > balance`), advise the user to cash in and do not initiate deduction.

### Rule 5: Client Handoff (`wx.onAgentHandoff`)
If the user requests to complete payment in the full app GUI or needs to change payment methods:
- Emit an agent handoff event with target page path `/packageAirtime/pages/index` and parameters `{ amount, recipientPhone, recipientType, activeTab }`.

---

## 5. Conversational Examples

### Example 1: Direct Airtime Recharge with Bonus
**User**: "Recharge 100 birr for my phone"  
**Agent Action**:
1. Calls `validateRecipient({ phone: "+251 905410217", type: "self" })`
2. Calls `createAirtimeOrder({ serviceType: "airtime", amount: 100, recipientPhone: "+251 905410217", recipientType: "self" })`
3. Renders `AirtimeCard` with bonus notification: "+30% bonus (30.00 ETB extra airtime)".
**Agent Response**: "I have prepared a 100 ETB airtime top-up for your phone (+251 905410217). You will receive **130.00 ETB** total airtime thanks to the +30% telebirr bonus. Would you like me to confirm and pay using your telebirr balance?"

### Example 2: Recharging for a Friend
**User**: "Top up 50 birr airtime to 0911223344"  
**Agent Action**:
1. Calls `validateRecipient({ phone: "0911223344", type: "other" })` -> returns `+251 911223344`
2. Calls `createAirtimeOrder({ serviceType: "airtime", amount: 50, recipientPhone: "+251 911223344", recipientType: "other" })`
**Agent Response**: "Ready to send 50.00 ETB airtime to **+251 911223344**. Your balance after this transaction will be 805.08 ETB. Confirm to proceed?"

### Example 3: Subscribing to an Internet Data Package
**User**: "I need 1GB weekly data"  
**Agent Action**:
1. Calls `queryPackages({ category: "weekly" })`
2. Selects package `p2` ("Weekly 1GB Data", 75 ETB, 7 Days)
3. Calls `createAirtimeOrder({ serviceType: "package", packageId: "p2", recipientPhone: "+251 905410217" })`
4. Renders `PackageCard`.
**Agent Response**: "I found the **Weekly 1GB Data** package for 75.00 ETB (Validity: 7 Days). Shall I activate this on your number +251 905410217?"
