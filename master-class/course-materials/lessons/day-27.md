# Day 27 — Building a Macle-targeted package

**Estimated time:** 5–10 minute reading, 25 minute release-preparation lab  
**Goal:** You make a reproducible build and distinguish it from
platform submission.
**Source:** [release artifact checklist](./code/day-22-to-28/day-27/release-checklist.md)

## In simple words

You will make a clean Macle build and check what files it produced. A
successful build only means it compiled; it does not mean the app was
approved or is ready to accept real payments.

## Key concepts

A compiled folder is not automatically a publishable Mini App. Packaging
depends on app metadata, compiler output, assets, permissions, account
configuration, and the portal's current requirements. The simulator proves
that a development package can run in that environment; it does not approve
an app for release.

You will create a clean build and inventory its files. You will not guess
portal steps, claim an app ID is production-ready, or include local secrets.
The capstone backend is an unauthenticated in-memory teaching service; it is
not a deployable production backend.

Record a reproducible build as a small manifest:

```text
Target: Macle
Command: npm run build:macle
Compiler/plugin versions: record from this checkout
Output: dist/
Portal approval: not established by this build
```

The final line matters: build success proves compilation for the configured
environment, not account approval, security review, or portal acceptance.

## Step-by-step tutorial

Delete only the generated `dist/` folder in the lesson project, run the
documented build, and list the resulting files. Compare app configuration
with project metadata. Explain which values are placeholders and must be
replaced only with approved values.

## Practice

You produce a clean starter build, inspect route registration and
assets, and create a release checklist. Check that no `.env`, private key,
test credential, or local-only debug file is included.

## Review questions

Check whether a successful build means the portal will accept the app. No.
Name the external information needed: current official
submission docs, account/merchant status, app metadata, and required reviews.

## Apply it

Attach a build manifest with version, tool versions, build command, output
location, and unresolved submission prerequisites. Use an approved test app
identifier only when one has been issued.

## Macle package tutorial: step by step

Use the [release checklist](./code/day-22-to-28/day-27/release-checklist.md)
to prepare a clean artifact:

1. Remove only the generated output folder in the lesson project.
2. Run the exact documented build command and capture tool versions.
3. Inventory the output files and confirm the registered pages and expected
   assets are present.
4. Check for local environment files, private keys, test credentials, and
   debug dumps.
5. Record what is still a placeholder and which current official portal
   requirements must be verified.

A successful compile is evidence of a build, not evidence of account
approval, provider certification, or portal acceptance. Your practice is complete when
another developer can reproduce the build and understand the remaining gates.
