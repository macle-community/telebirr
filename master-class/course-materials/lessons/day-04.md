# Day 4 — Macle app setup and configuration

**Estimated time:** 5–10 minute reading, 25 minute configuration lab  
**Goal:** You can trace how a Macle-targeted app page is registered, compiled,
and loaded by the simulator.

## Key concepts

The Macle app is more than its starter page. The build configuration selects
the source compiler, source directory, output directory, and Macle platform
plugin. The app configuration declares routes and shared window settings. A
page configuration can customize the navigation title or other supported
page-level behavior.

A route must exist in the app configuration before navigation to it can work.
The source folder and compiled output are different: edit `src/`, then
build into `dist/`. Do not hand-edit generated output to fix a source issue;
the next build will replace it.

Configuration is executable project behavior. Make one small change at a
time, rebuild, and inspect the result. If you copy settings from a different
framework, verify that this plugin version understands them.

In the starter, the app route is registered in `src/app.config.ts`:

```ts
export default defineAppConfig({
  pages: ['pages/index/index'],
})
```

That route corresponds to `src/pages/index/index.tsx`. Adding a component
file in another folder does not register a new route; the route list and
source location must agree.

## Step-by-step tutorial

Open `starter-template/config/index.ts`, `src/app.config.ts`, and
`src/pages/index/index.config.ts`. Identify the output root, initial route,
and title. Change the app title and rebuild to observe the result.

## Practice

Create `src/pages/about/index.tsx` with a heading and one paragraph. Add
`pages/about/index` to the app's `pages` array. Use the route API documented
for the installed Macle plugin/runtime combination to navigate there from the starter page, or
temporarily set it as the first page to verify registration.

## Review questions

Find the source of truth for the route list, app title, and generated files:
the app config, page config, and build output, respectively. If you have a
partner, compare your answers.

## Apply it

Add a second route and a clear way to return to the first. Record the exact
route string used in registration and navigation. If the simulator fails,
include the build log and console message in your report.

## Macle route tutorial: step by step

Open the three starter configuration files named above and trace a route:

1. `src/app.config.ts` contains the registered page path.
2. A page component and optional page configuration live under the matching
   `src/pages/<name>/` directory.
3. Taro's build config selects the project source and output locations.
4. Navigation must use the exact registered route and an API verified for
   the installed Macle plugin/runtime combination.
5. The generated output is the artifact the simulator reads; source changes
   are not visible until a successful rebuild/reload.

Add the about page, register it, and temporarily make it the initial route if
navigation support is unclear. Build before adding navigation so you can
isolate route registration from event behavior. Then add a link back and test
both directions. Check that the route exists and is registered, the build
succeeds, the initial page renders, and navigation reaches its destination.
