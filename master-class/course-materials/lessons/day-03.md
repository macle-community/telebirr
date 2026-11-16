# Day 3 — How a Macle app renders

**Estimated time:** 5–10 minute reading, 20 minute investigation  
**Goal:** You can describe the observed source-to-screen path and
separate known facts from implementation assumptions.

## Key concepts

Your app uses React components, but the host does not execute its source
file as a desktop browser would. Taro and its Macle platform plugin compile the
application into artifacts the Macle runtime can load. At runtime, application
logic and the visible page communicate through the platform's rendering
mechanism, and native capabilities are exposed through APIs.

It is useful to think in boundaries: source code, compiler output,
application logic, view rendering, and native host. It is less useful to
memorize an internal file name and assume every release keeps it. The compiler
and runtime can change. Inspect the artifacts produced by your installed versions and label what
you actually observe.

When a click updates state but the screen does not change, the defect could
be in the event path, state update, generated output, page lifecycle, or view
runtime. A layered model gives you a finite debugging plan.

For example, this component asks React to render the current value:

```tsx
const [count, setCount] = useState(0)

<Button onClick={() => setCount((current) => current + 1)}>
  Taps: {count}
</Button>
```

The event handler changes state; React re-renders the component with the new
value; the platform build/runtime then reflects that update on screen. The
snippet is a source-level explanation, not a claim about a particular
internal Macle rendering file.

## Walkthrough

1. Build the starter.
2. Locate the output directory from the Taro config (`outputRoot`).
3. Search the output for the starter page text and inspect the app/page
   configuration.
4. Click the counter and observe the rendered value change.
5. Explain that generated output is evidence for this build, not a stable API.

## Practice

Change the counter label, build again, and locate both the updated text and
page registration in the output. Write a four-step trace:
React event → state update → platform output/runtime → visible value. If
you cannot prove a step from the build or logs, mark it “inferred.”

## Review questions

**Question:** Is generated MAML or a compiler-internal service file the API you should
build product code against? No. Prefer documented Taro APIs; inspect
generated files when diagnosing compatibility or compiler behavior.

## Apply it

Add a simple state-driven message to the starter. Include a short note naming
the source file changed and how you confirmed the output came from the latest
build rather than a stale simulator target.

## Detailed walkthrough

After building the starter, use `config/index.ts` to identify `outputRoot`.
Inspect the generated files as read-only evidence:

1. Search for the changed page text and compare it with the source.
2. Find the generated route/app configuration and compare it with
   `src/app.config.ts`.
3. Click the counter and observe whether the event updates React state and
   the visible value.
4. Rebuild after changing the text, then verify the updated output and
   simulator page.
5. Describe the path as observed or inferred at each step.

Do not edit generated files to repair a source issue. They are regenerated
and may not have stable internal names across compiler releases. The expected
artifact is a short annotated trace with source path, generated output
location, and one uncertainty explicitly marked.
