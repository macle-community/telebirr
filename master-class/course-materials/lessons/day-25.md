# Day 25 — Debugging

**Estimated time:** 5–10 minute reading, 30 minute diagnosis lab  
**Goal:** You produce a repeatable diagnosis instead of guessing.
**Source:** [debugging record template](./code/day-22-to-28/day-25/debugging-checklist.md)

## Key concepts

Debugging starts by making a failure reproducible. Record the route, steps,
build command, versions, expected result, observed result, and the first
useful error. Then identify which layer is implicated: source, compiler,
generated configuration, app logic, view, simulator, or native API.

A blank screen does not tell you whether the app failed to launch, route
registration failed, rendering failed, or content is hidden by CSS. Inspect
logs and the page tree. Rebuild into a clean output when stale artifacts are
possible. Browser developer tools and remote inspection depend on simulator
and device support; verify the exact workflow rather than assuming a
`chrome://inspect` recipe works everywhere.

Use a reproducible report rather than “the page is broken”:

```text
Route: pages/index/index
Steps: start backend, open catalog, tap Retry
Expected: products appear
Observed: request error stays visible
First relevant error: connection refused
```

Those details distinguish a backend availability problem from a rendering
or route bug. Record the actual versions and error from your environment;
the values above are a fictional example, not a claim about a current run.

## Walkthrough

Introduce one controlled bug in a branch: misspell a registered route or
break a harmless import. Run the build, record the first error, correct the
source, rebuild, and confirm the page. Notice that an app can launch while
one page still fails.

## Practice

Choose a small defect such as a wrong route path, invalid response shape,
missing backend, or CSS overflow. Before editing, write a minimal
reproduction, evidence, likely root cause, and proposed fix. If working with
a partner, compare diagnoses before making the change.

## Review questions

Review the bug report. It should include exact steps and a relevant error,
not “it doesn't work.” The proposed fix should address the root cause rather
than hiding the symptom.

## Apply it

Write a short postmortem for the lab defect. Include what would have made it
harder to diagnose and one regression test or checklist item to prevent it.

## Detailed walkthrough

Use the [diagnosis template](./code/day-22-to-28/day-25/debugging-checklist.md).
Start with one controlled defect and fill the
reproduction fields before editing:

1. Record route, build/runtime versions, exact steps, expected behavior, and
   observed behavior.
2. Capture the first useful compiler/runtime error, not only the last
   cascading message.
3. Classify the likely layer: source, route/config, generated bundle,
   backend, view/style, simulator, or native capability.
4. Run one smallest experiment that can distinguish two plausible causes.
5. Apply one root-cause fix, rebuild, and repeat the reproduction steps.
6. Add a regression test or a documented manual check.

For a blank screen, check whether the app booted, whether the route exists,
whether the page rendered, and whether content is hidden before changing
several CSS rules at once.
