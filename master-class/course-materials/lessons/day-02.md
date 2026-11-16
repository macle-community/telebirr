# Day 2 — Toolchain and simulator

**Estimated time:** 5–10 minute reading, 20–30 minute setup lab  
**Goal:** You can build the starter and identify the versions involved.

## Key concepts

A successful Mini App build depends on several tools working together.
Node.js runs the build tools; npm installs the project dependencies; Taro
transforms React application code; the Macle platform plugin teaches Taro
about the target; and the simulator loads the compiled output. These are
separate layers. When something fails, identify which layer reported the
error before changing configuration.

You will use the starter's lockfile to keep dependency versions repeatable.
Do not begin by installing a second global Taro version. Use the project's
scripts so the compiler selected by this repository is the one that runs.
The simulator is useful for fast feedback, but it does not prove that every
device feature or production flow works on a real phone.

A useful diagnostic habit is to record versions and retain the first useful
error message. A blank screen is a symptom; the console, build log, route
configuration, and runtime logs help you locate the cause.

The local npm scripts deliberately separate the checks:

```text
npm run typecheck  -> TypeScript check
npm run build:macle -> compile for the Macle target
npm run sim:macle   -> build, then launch the web simulator
```

A passing typecheck does not prove that the Macle compiler or simulator can
run the app. Each command answers a different question, so keep its result
separate in your setup notes.

## Walkthrough

From `starter-template/`, run:

```sh
npm ci
npm run typecheck
npm run build:macle
npm run sim:macle
```

Open the simulator address printed or documented by the script. Confirm
the compiler success line and inspect the page. If a command fails, read the
first meaningful error before retrying.

## Practice

Repeat the same sequence. Record the Node version with `node --version`,
the npm version with `npm --version`, the Taro version shown during build, and
the plugin version from the lockfile. Change the greeting in the starter,
rebuild, and confirm the simulator displays the change.

## Review questions

Match each symptom to a layer: dependency installation failure, Taro
compile error, simulator cannot find a page, or unsupported native API.
Identify the first log or file you would inspect for each.

## Apply it

Write a short “clean setup” note that includes the commands you ran, versions,
simulator URL, and one issue encountered or one detail that was easy to miss.
Do not include credentials, personal tokens, or private device data.

## Detailed walkthrough

Run setup from the starter directory and keep the output for each command:

1. `node --version` and `npm --version` establish the local toolchain.
2. `npm ci` installs the exact dependency graph from the lockfile. If it
   fails, record the first dependency error before changing Node versions or
   deleting files.
3. `npm run typecheck` checks the TypeScript source but does not compile a
   Macle package.
4. `npm run build:macle` exercises Taro and the Macle plugin. Record the
   actual output directory and first compiler warning/error.
5. `npm run sim:macle` rebuilds and starts the web simulator. Confirm that
   the visible page came from the latest build by changing the greeting and
   repeating the command.

Compare recorded Taro and plugin versions with `package-lock.json`. Do not
install a global CLI to fix a project-local version mismatch. The report
should separate installation, typecheck, compilation, and simulator results.
