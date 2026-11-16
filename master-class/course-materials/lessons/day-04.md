# Day 4 — Find the Macle app's first screen

**Time:** About 20 minutes
**You will:** Find how the starter chooses its first screen.

## In simple words

A **page** is one screen in an app. A **route** is the page's name in the
app's list. The starter currently has a route named `pages/index/index`.
That route points to the page file you edited yesterday.

You will look at the setup, not change it yet. This helps you know where to
look if the simulator cannot find a page.

## Step by step

1. Open `starter-template/src/app.config.ts`.
2. Find `pages/index/index`. This is the first page route in the starter.
3. Open `starter-template/src/pages/index/index.tsx`. This file contains
   the screen's content.
4. Open `starter-template/config/index.ts`. Find `outputRoot`; it names
   the folder where the build puts its generated files.
5. Compare the route and page filename:

   ```text
   route: pages/index/index
   file:  src/pages/index/index.tsx
   ```

6. Build again with `npm run build:macle`. Check that it finishes.

## Add a practice page

Do this only after you have found the files above:

1. Create a new folder named `src/pages/about/`.
2. Inside it, create `index.tsx` and copy in this small screen:

   ```tsx
   import { Text, View } from '@tarojs/components'

   export default function AboutPage() {
     return (
       <View>
         <Text>About this practice app</Text>
         <Text>This is my second screen.</Text>
       </View>
     )
   }
   ```

3. In `src/app.config.ts`, add the new route to the `pages` list:

   ```ts
   pages: ['pages/index/index', 'pages/about/index'],
   ```

   Keep the existing `window` settings below it.
4. Build again with `npm run build:macle`. If the build succeeds, the new
   route is registered.

The app will still open on its first screen. That is expected: adding a
second screen does not add a button to open it. Page navigation is covered
on Day 9.

## Check your understanding

Does making a new page file automatically add it to the app? **No.** Add
its route to `src/app.config.ts` too.

## If something goes wrong

- If the build says it cannot find the page, compare the route spelling with
  the folder and filename.
- If the build succeeds but the simulator does not show the new page, that
  is expected: you added a route but did not change the first page.
- If you are unsure, remove only the practice page and route entry, then
  rebuild to return to the original starter.
