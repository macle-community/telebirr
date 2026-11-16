# Day 5 — Your first React page

**Estimated time:** 10–15 minute reading, 25 minute practice  
**Goal:** Build a small Taro page, identify its React and platform components,
and verify that a source change appears in the Macle simulator.

## What you are building

In this lesson, you will make a simple product-information page for a
fictional coffee shop. It contains a category, a product name, a description,
and a price. The page is intentionally static: the focus is how React
describes a screen and how Taro components are used in a Mini App. Buttons,
state changes, styling, and native APIs are covered in later lessons.

The rendering path is:

```text
React page source -> Taro components -> Macle build output -> simulator
```

Changing the source file alone does not update the simulator. The app must be
rebuilt and the new output loaded.

## Key concepts

**A page is a React component.** A component is a JavaScript function that
returns JSX describing the interface. In this example, `IndexPage` is the
page component and its `return` value describes the content to show.

**JSX describes a tree.** The outer `View` contains several `Text` elements.
This parent-child structure is important: the elements inside a parent form
the content of that section.

**Use Taro's platform components.** `View` and `Text` come from
`@tarojs/components`. They provide cross-platform UI elements that the Taro
Macle plugin can compile for its target. Do not replace them with browser
elements such as `<div>` or `<p>` in this page.

**The default export makes the page available to the app.** The starter
registers `pages/index/index` in `src/app.config.ts`; that route resolves to
`src/pages/index/index.tsx`. Keep the registered route and file location
consistent.

## Walkthrough

Open `starter-template/src/pages/index/index.tsx` and replace its contents
with this example:

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

The example imports two Taro components. `IndexPage` returns one outer
container, followed by four text elements nested inside it. The text is
sample product information; it is not loaded from a server and it does not
represent a real offer.

The rendered page should show, in order:

1. `ETHIOPIAN COFFEE`
2. `Yirgacheffe Coffee`
3. `Washed coffee with floral and citrus notes.`
4. `Price: 250 ETB`

It may look plain because this example has no page-specific styles. That is
expected; Day 6 adds layout and visual styling.

## Run and inspect the example

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
- **TypeScript reports that a component is missing:** check the import from
  `@tarojs/components` and match the component's spelling and capitalization.
- **A browser element does not compile or render:** use the Taro components
  supported by the project rather than assuming ordinary web elements work in
  the target runtime.
- **The text looks unstyled:** that is expected in this lesson. Day 6 covers
  stylesheets and responsive layout.

## Review questions

1. What does the `IndexPage` function return?
2. Which element contains the four text elements?
3. Why does this example import `View` and `Text` from Taro instead of using
   HTML elements?
4. What steps make a source change visible in the simulator?

**Check your understanding:** The function returns JSX; `View` is the parent
container; Taro components are intended for the target platform; and source
changes must be rebuilt and loaded in the simulator.

## Apply it

Keep your completed page as a checkpoint. Write down the source path, the
command that produced the Macle build, and one difference between the JSX
source and what you observed in the simulator. In Day 6, you will style this
same product information for a small screen.
