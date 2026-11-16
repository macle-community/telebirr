# Day 2 — Open the starter in the Macle simulator

**Time:** About 20–30 minutes
**You will:** Build the starter and see its first screen.

## In simple words

You will run four commands. Installing downloads the project's tools.
Checking looks for code mistakes. Building prepares the app for Macle.
Starting the simulator opens that built app so you can see it.

The starter uses React and Taro behind the scenes. You do not need to learn
those tools today; follow the commands and check that the Macle screen opens.

## Before you start

You need Node.js 18 or newer, npm, and access to a Macle simulator. From the
repository's top folder, open a terminal (a place to type commands) and run:

```sh
cd master-class/starter-template
node --version
npm --version
```

If either version command says it cannot find the program, install Node.js
before continuing.

## Step by step

Run one command at a time in the `starter-template/` folder:

```sh
npm ci
```

Wait for it to finish. It downloads the exact tools listed for this project.
If it reports an error, keep the first error message; do not delete files.

```sh
npm run typecheck
```

This checks the code for common mistakes. It does not open the app.

```sh
npm run build:macle
```

This prepares the app for Macle. Continue when it says the build completed.

```sh
npm run sim:macle
```

This starts the web simulator. Open `http://localhost:30005` if it does not
open automatically. You should see “Hello, Telebirr” and a button.

## What to do if it does not work

- If `cd` fails, check that you started from the repository's top folder.
- If `npm ci` fails, check that Node.js is installed and save the first
  error message.
- If the build fails, copy the first red error line. A later error may just
  be a consequence of the first one.
- If the page is blank, check the build output and simulator console.

## Check your understanding

Which command opens the app in the simulator? `npm run sim:macle`. Which
command prepares the Macle build? `npm run build:macle`.

## Save your progress

Write down whether each of the four commands worked. If something failed,
save the first error message. You will use this working starter in Day 3.
