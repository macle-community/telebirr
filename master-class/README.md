# Macle Telebirr Mini App Masterclass

A practical, Macle-first 30-day course for building Telebirr Mini Apps. The starter uses React and Taro as source/build tools; the lessons focus on the Macle runtime, its supported capabilities, and verifying behavior in the target environment.

> **Before publishing:** verify current platform audience figures, SDK names, API signatures, simulator requirements, and developer-portal steps against current official sources. This repository avoids promising unverified user counts or production payment access.

## Start here

- [Course website](https://macle-community.github.io/telebirr/)
- [30-day syllabus](#30-day-syllabus)
- [Full lesson manuscripts](./course-materials/lessons/README.md)
- [Lesson source code (Day 6 onward)](./course-materials/lessons/code/README.md)
- [Daily lesson guide overview](./course-materials/lesson-guides.md)
- [Starter template](./starter-template/README.md)
- [EthioShop capstone](./final-project/README.md)
- [Course materials](./course-materials/README.md)

## Prerequisites

- Node.js 18 or later
- npm
- Familiarity with JavaScript and basic React
- A supported Macle development/simulator environment; see the starter guide

## Quick start

```sh
cd starter-template
npm install
npm run build:macle
npm run sim:macle
```

The simulator command serves the compiled output on port `30005`. Open `http://localhost:30005`.

## 30-day syllabus

Each lesson is designed for a short lecture followed by a hands-on exercise. Days 1–28 build toward the capstone; Days 29–30 complete and present it.

### Phase 1 — Foundations (Days 1–7)

| Day | Lesson | Practice |
| --- | --- | --- |
| 1 | The Macle Mini App and course project | Explore the finished EthioShop demo and identify runtime boundaries |
| 2 | The Macle build toolchain and simulator | Build, launch, and record target versions |
| 3 | Macle logic, view, MAML, and data updates | Trace one rendered page through the runtime |
| 4 | Macle app setup and configuration | Trace a registered route into the Macle build |
| 5 | Build your first Macle screen | Change a label and verify it in the simulator |
| 6 | Layout and styling in the Macle view | Build and test a responsive product card |
| 7 | Macle mini-project: Telebirr profile | Build and verify a profile screen |

### Phase 2 — Core mechanics (Days 8–14)

| Day | Lesson | Practice |
| --- | --- | --- |
| 8 | Macle view events and state updates | Trace a tap through to the visible state |
| 9 | Macle page routes and navigation | Register and verify a product detail route |
| 10 | Macle network requests and host APIs | Verify a request API and build retry states |
| 11 | Macle-compatible components | Check target support before integrating a component |
| 12 | Data-driven lists in the Macle view | Render and filter a product list |
| 13 | Macle input and form states | Build a validated form with target-supported inputs |
| 14 | Macle app persistence: to-do list | Verify storage support and handle failures |

### Phase 3 — Fintech fundamentals (Days 15–21)

| Day | Lesson | Practice |
| --- | --- | --- |
| 15 | Macle payment handoff and trust boundaries | Trace the client, backend, and provider roles |
| 16 | Macle client and backend order boundary | Keep price and order authority on the server |
| 17 | Macle checkout request states | Submit a mock order and render its explicit status |
| 18 | Macle identity, authorization, and consent | Separate consent from platform authorization |
| 19 | Securing Macle app integrations | Keep secrets off-device and review the build |
| 20 | Macle network failure and recovery | Test retry and ambiguous order outcomes |
| 21 | Backend-verified demo feature in Macle | Show only the backend's demo entitlement |

### Phase 4 — Production readiness (Days 22–28)

| Day | Lesson | Practice |
| --- | --- | --- |
| 22 | Macle device capabilities and permissions | Verify capability support and provide a fallback |
| 23 | Macle location capabilities and privacy | Use location only with verified support and consent |
| 24 | Macle build and rendering performance | Measure output and reduce unnecessary updates |
| 25 | Debugging the Macle app pipeline | Trace a failure across source, build, and runtime |
| 26 | Macle view feedback and polish | Verify loading, empty, and error states |
| 27 | Building a Macle-targeted package | Build reproducibly and inspect the output |
| 28 | Testing across Macle runtimes and devices | Record compatibility evidence and gaps |

### Phase 5 — Capstone and presentation (Days 29–30)

| Day | Lesson | Practice |
| --- | --- | --- |
| 29 | Macle EthioShop end-to-end tutorial | Build a catalog, cart, and verified mock order flow |
| 30 | Presenting and validating your Macle app | Show build evidence, limits, and next steps |

## Repository layout

```text
course-materials/    Architecture notes and reference sheets
final-project/       EthioShop frontend and demo backend
starter-template/    Minimal Taro + Macle getting-started app
```

## Scope and safety

The EthioShop checkout is a **mock demonstration**, not a production Telebirr integration. Production payment requires current provider documentation, merchant onboarding, server-side signing/verification, and approved credentials. Never collect or store a payment PIN in the Mini App. Do not put merchant secrets in frontend code.

Platform APIs, component catalogs, simulator support, and submission requirements can change. Confirm each against the current official Macle/Telebirr documentation before teaching it as a guaranteed capability.

## License

Course-specific content and starter code are released under the MIT License. See [LICENSE](../LICENSE).
