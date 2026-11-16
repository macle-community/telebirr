# Day 5 — Build your first Macle screen

**Estimated time:** 10–15 minute reading, 25 minute practice  
**Goal:** Build a small screen for the Macle runtime, then verify its
source-to-simulator path. React and Taro are the starter's implementation
tools, not the runtime being learned.

## What you are building

In this lesson, you will make a simple Macle screen for a fictional coffee
shop. It contains a category, product name, description, and price. The screen
is intentionally static so you can focus on the Macle build-and-render loop.
The starter expresses the screen through React and Taro; those are the source
adapter, while the simulator output is the Macle behavior you verify.

For this starter, the source-to-runtime path is:

```text
React page source -> Taro components -> Macle build output -> simulator
```

Changing the source file alone does not update the simulator. The app must be
rebuilt and the new output loaded.

## Key concepts

The learning target is the Macle build and runtime. Taro components are the
source-level interface used by this starter; their availability is determined
by the installed Macle plugin and must be checked in the compiled target.

**The starter page is compiled for Macle.** In this project, `IndexPage` is a
React function whose JSX is input to the Macle-targeted build. The runtime
does not load this source file directly; the simulator loads the compiled
output.

**JSX describes a tree.** The outer `View` contains several `Text` elements.
This parent-child structure is important: the elements inside a parent form
the content of that section.

**Verify components at the Macle target.** This starter uses `View` and
`Text` from `@tarojs/components`. The installed Macle plugin determines
whether those source components compile and render correctly. Do not assume
browser elements or components from another Mini App runtime are equivalent.

**The default export makes the page available to the app.** The starter
registers `pages/index/index` in `src/app.config.ts`; that route resolves to
`src/pages/index/index.tsx`. Keep the registered route and file location
consistent.

## Step-by-step Macle screen tutorial

1. Open `starter-template/src/pages/index/index.tsx` and confirm
   `pages/index/index` is registered in `src/app.config.ts`.
2. Replace the page source with the small product view below.
3. Build for Macle and launch the simulator using the commands in
   [Build and inspect the Macle output](#build-and-inspect-the-macle-output).
4. Verify all four labels in the simulator, change the product name, rebuild,
   and confirm the new output is loaded.

```tsx
import { Text, View } from '@tarojs/components'

export default function IndexPage() {
  return (
    <View>
      <Text>ETHIOPIAN COFFEE</Text>
      <Text>Yirgacheffe Coffee</Text>
      <Text>Washed coffee with floral and citrus notes.</Text>
      <Text>Price: 250 ETB</Text>
    </View>
  )
}
```

The source example imports two components, then the Macle build translates
that source for the target runtime. `IndexPage` returns one outer container,
followed by four nested text elements. The text is sample product information;
it is not loaded from a server and does not represent a real offer.

The rendered page should show, in order:

1. `ETHIOPIAN COFFEE`
2. `Yirgacheffe Coffee`
3. `Washed coffee with floral and citrus notes.`
4. `Price: 250 ETB`

It may look plain because this example has no page-specific styles. That is
expected; Day 6 adds layout and visual styling.

## Build and inspect the Macle output

From the `starter-template/` directory, run:

```sh
npm run typecheck
npm run build:macle
npm run sim:macle
```

The typecheck verifies the TypeScript source. The build compiles the app for
Macle, and the simulator loads that build. Confirm that all four text lines
appear. Then change `Yirgacheffe Coffee` to another sample name, rebuild, and
confirm the new name appears. This checks that you are viewing the latest
output rather than a stale build.

## Practice

Extend the page with a fictional coffee product of your choice:

- Change the name, description, and displayed price.
- Add one more `Text` element describing the roast or origin.
- Keep each piece of content inside the `View`.
- Rebuild and confirm that the new text appears in the order you intended.

Before moving on, try temporarily removing the outer `View`, then restore it.
Observe why a container is useful when a page has several related elements.

## Common mistakes

- **The page still shows the old greeting:** confirm you edited
  `starter-template/src/pages/index/index.tsx`, then build again and reload
  the simulator.
- **The app cannot find the page:** check that `pages/index/index` remains in
  `src/app.config.ts` and that the file is in the matching directory.
- **The build reports that a component is missing:** verify the installed
  Macle plugin's supported component set and the source import spelling.
- **A browser element does not compile or render:** use the Taro components
  supported by the project rather than assuming ordinary web elements work in
  the target runtime.
- **The text looks unstyled:** that is expected in this lesson. Day 6 covers
  stylesheets and responsive layout.

## Review questions

1. What does the `IndexPage` function return?
2. Which element contains the four text elements?
3. What does the Macle-targeted build do with the source-level `View` and
   `Text` components?
4. What steps make a source change visible in the simulator?

**Check your understanding:** The source function describes a view, `View`
is the parent container, component support is target-specific, and source
changes must be rebuilt before the Macle simulator can show them.

## Apply it

Keep your completed page as a checkpoint. Write down the source path, the
command that produced the Macle build, and one difference between the JSX
source and what you observed in the simulator. In Day 6, you will style this
same product information for the Macle view.
