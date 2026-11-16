# Day 11 — Macle-compatible components

**Estimated time:** 5–10 minute reading, 25 minute compatibility lab  
**Goal:** You can integrate a component only when its assets and
runtime compatibility are verified.
**Source:** [core component fallback](./code/day-10-to-14/day-11/core-button.tsx) ·
[component compatibility notes](../cheatsheets/components.md)

## Key concepts

A component library can speed up product work, but a package being
installable does not prove its native components are available in the
simulator or on a device. A Mini App component can require compiled templates,
styles, registration metadata, or a minimum runtime version.

This starter disables automatic MAUI asset copying because it does not bundle
the component library's source assets. That is deliberate: a vague warning
followed by a missing component is worse than a clear prerequisite. If the
course has a compatible MAUI distribution, configure its documented source
directory, build, and inspect what was copied. If it does not, use the core
Taro button and keep moving.

The core-component fallback is a complete, small Taro example:

```tsx
import { Button, Text, View } from '@tarojs/components'

export default function ContinuePanel() {
  return (
    <View>
      <Text>This screen uses a Taro core component.</Text>
      <Button>Continue</Button>
    </View>
  )
}
```

It avoids a third-party asset dependency. Before swapping in a library
button, verify its templates, styles, registration instructions, and target
runtime compatibility from that library's documentation.

## Step-by-step tutorial

Open the installed plugin README and identify the documented component setup.
Compare it with `course-materials/cheatsheets/components.md`. Inspect the
plugin configuration's MAUI copy/injection flags and note why they are
disabled in the starter. Do not invent a library path.

## Practice

Choose a component from an officially documented catalog. Record the package/library version, runtime compatibility, asset directory, and
registration requirement. If those are available, configure the source path
and compile a single component. If not, render an equivalent Taro core
component and record the missing dependency.

## Review questions

**Question:** The package installed without errors; does that prove the native
component can render? No. Identify the evidence you need:
assets, registration, compatible runtime, and successful target rendering.

## Apply it

Write a short integration note with the exact source used, version, required
configuration, and simulator result. Do not commit proprietary UI assets
unless the license allows it.

## Macle component integration: step by step

The [source example](./code/day-10-to-14/day-11/core-button.tsx) is intentionally built from
core Taro components. First, inspect the plugin version actually installed,
then inspect the component library's own compatibility and registration
instructions. Record the evidence before editing configuration:

1. Record the installed Macle plugin and component package versions.
2. Check the component's documented Macle runtime compatibility.
3. Identify required assets and registration steps from the package docs.
4. Build and render one component in the Macle simulator.
5. If any requirement is unverified, keep the core-component fallback and
   record the missing evidence rather than guessing at setup.

| Question | Evidence to record |
| --- | --- |
| Which component package/version? | Lockfile and package metadata |
| Which runtime versions? | Official compatibility statement |
| Which assets are needed? | Documented source and output directories |
| How is it registered? | Exact configuration or generated manifest |
| Did it render? | Fresh build and simulator/device result |

If any required asset or compatibility fact is missing, keep the core
component fallback and state the limitation. This is a valid completed lab;
it avoids teaching a fabricated path or a component that silently fails.
