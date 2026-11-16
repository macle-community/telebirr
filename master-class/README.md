# Macle Telebirr Mini App Masterclass

A beginner-friendly, step-by-step 30-day course for building Telebirr Mini Apps for Macle. You do not need prior Macle, React, or Taro experience. The course explains those words as they come up and shows you what to do and how to check your work.

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

## What you need

- Node.js 18 or later
- npm
- A computer where you can install software and type commands in a terminal
- Access to a supported Macle development/simulator environment; see the starter guide

You do not need to know Macle, React, or Taro before starting. Some basic
coding experience will help, but the first lessons explain the starter
project and walk you through it step by step. This is not a course on
programming fundamentals from zero.

## Start the first lesson

```sh
cd master-class/starter-template
npm ci
npm run typecheck
npm run build:macle
npm run sim:macle
```

Open `http://localhost:30005` in your browser. If a command fails, keep the
first error message and use the Day 2 guide to troubleshoot it.

## 30-day syllabus

Each lesson is designed for a short lecture followed by a hands-on exercise. Days 1–28 build toward the capstone; Days 29–30 complete and present it.

### Phase 1 — Foundations (Days 1–7)

| Day | Lesson | Practice |
| --- | --- | --- |
| 1 | Your first look at a Macle Mini App | See what you will build and learn what the shop demo does |
| 2 | Open the starter in the Macle simulator | Follow setup steps and open your first screen |
| 3 | How a Macle screen gets from code to simulator | Change one line and see the result |
| 4 | Find the Macle app's first screen | Find the page list and the screen file |
| 5 | Make your first Macle screen | Change the sample screen one step at a time |
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
