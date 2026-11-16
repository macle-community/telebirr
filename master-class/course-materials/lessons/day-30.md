# Day 30 — Presenting and validating your Macle app

**Estimated time:** 5–10 minute review, 30 minute presentation preparation  
**Goal:** You can present the app, evidence, limitations, and next
steps responsibly.
**Source:** [presentation checklist](./code/day-29-to-30/presentation-checklist.md) ·
[capstone README](../../final-project/README.md)

## In simple words

Show what you built, how you checked it, and what you have not checked.
Explain that checkout is pretend. You do not need to claim the app is ready
for production.

## Key concepts

A strong technical demo is honest and repeatable. Show what works, explain
the environment in which it was tested, and make limitations visible. Do
not turn a mock order into a claim of payment integration or promise a
platform feature that has not been verified.

Your capstone demonstrates that you can build and validate a Macle-targeted
Mini App with this starter's React/Taro source toolchain, connect a backend,
model request states, and reason about trusted boundaries.
It is the beginning of a production project, not a substitute for platform
approval or merchant onboarding. The next steps should come from evidence:
compatibility testing, official API requirements, product needs, and review
from the platform and security owners.

Use an evidence table to keep the presentation factual:

| Claim | Evidence | Limitation |
| --- | --- | --- |
| The starter compiles for the configured target | Recorded build output | Does not prove portal approval |
| The shop can create a demo order | Local backend response and test | Does not process a real payment |
| The page renders in the simulator | Simulator observation | Does not prove device parity |

Replace these examples with results from your own run. If a check was not
performed, say “not tested” and name the next verification step.

## Your presentation

Prepare a short presentation:

1. State the problem and show the app running.
2. Walk through one normal path and one failure path.
3. Show one test or build result.
4. Explain the client/backend boundary and why checkout is mocked.
5. Name the highest-priority unresolved production requirement.

## Practice

Set aside 10 minutes to rehearse the presentation. If you have a partner,
ask for feedback on one unclear explanation, one missing piece of evidence,
and one strength. Revise the demo before presenting it.

## Review questions

After the demo, explain one failure state, identify which system owns the
order result, and distinguish observed platform behavior from a feature that
still needs official verification.

## Self-review

Ask yourself one question about a user-experience state and one about data
trust or platform support. Answer with observed evidence, or write down what
still needs verification. It is acceptable to say “I do not know yet” if you
identify how you will find out.

## Apply it

Publish a final project note containing the setup instructions, a clean
build/test result, a short demo, and prioritized production gaps. Do not
include live credentials or personal financial information.

## Graduation checkpoint

The project has reproducible setup instructions, a clean build, a test
result, a short demo, and a prioritized follow-up list. No live credentials
or personal financial information are included.

## Next steps

Create a maintained device test matrix, verify current Macle documentation,
request approved test and merchant access through official channels, replace
the demo backend with a reviewed service only when ready, and plan security,
privacy, accessibility, and operational reviews before any real launch.

## Step-by-step Macle presentation tutorial

Use the [presentation checklist](./code/day-29-to-30/presentation-checklist.md)
to rehearse:

1. Start both services from a clean terminal using documented commands.
2. Show the catalog, cart, and one explicitly mocked order.
3. Stop the backend and demonstrate an honest failure/recovery state.
4. Point to the server's price calculation and explain why client state is
   not proof of settlement.
5. State the tested environments and name at least one untested runtime or
   production prerequisite.

Your review should separate observed evidence from assumptions. A strong
presentation is clear about limitations and proposes a realistic next
verification step rather than claiming production readiness.
