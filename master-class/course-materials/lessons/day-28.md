# Day 28 — Testing across Macle runtimes and devices

**Estimated time:** 5–10 minute reading, 30 minute test-matrix lab  
**Goal:** You report device evidence without assuming simulator parity.
**Source:** [device matrix template](./code/day-22-to-28/day-28/device-matrix.csv)

## Key concepts

A simulator is a fast test environment, not a complete device. Differences
can appear in keyboard handling, screen dimensions, network access,
permissions, native component behavior, and app lifecycle. Testing should
cover the supported device/runtime combinations that matter to the project.

Use fictional accounts and data unless an approved test environment is
provided. Do not use personal financial credentials. Remote debugging,
ADB, and developer options vary by device and platform policy; confirm
support before promising a workflow.

The test matrix records observations per environment and scenario:

```csv
device,os_version,macle_runtime,scenario,result
web-simulator,record-version,record-version,initial-launch,not-tested
approved-test-device,record-model,record-version,navigation,not-tested
```

Replace placeholders only after running the scenario. If no approved device
is available, leave that result as `not tested`; do not infer device support
from the simulator row.

## Step-by-step tutorial

Review a small matrix with environment, OS/device, runtime, route, network,
permission, and result. Run the starter in the simulator, then a supported
device if available. If no device is available, mark the device row
“not tested” instead of inferring success.

## Practice

Test initial launch, navigation, a long page, a failed backend request, a
permission denial (mock if necessary), and app restart. Record actual
observations and attach only non-sensitive screenshots.

## Review questions

The simulator passed; can you mark device testing complete? No. If no device
is available, document that limitation and schedule a follow-up device test.

## Apply it

Complete the test matrix and prioritize the top three device risks. Do not
include phone numbers, account identifiers, or payment information in the
report.

## Macle test tutorial: step by step

Start with the [device matrix](./code/day-22-to-28/day-28/device-matrix.csv).
The prefilled rows are test cases, not test results:

1. Replace each recorded-version placeholder with the actual environment.
2. Run launch, navigation, long-page, network-failure, permission-denied,
   and restart scenarios.
3. Record only observed behavior; if a device or capability is unavailable,
   keep its result as “not tested.”
4. Attach evidence with tokens, phone numbers, order details, and identifiers
   removed.
5. Compare simulator and device results and prioritize discrepancies by user
   impact and likelihood.

The course is complete even if no physical device is available, provided the
report states that limitation and assigns the follow-up test.
