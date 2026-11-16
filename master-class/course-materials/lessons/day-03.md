# Day 3 — How a Macle screen gets from code to simulator

**Time:** About 20 minutes
**You will:** Change one line and follow it from your file to the screen.

## In simple words

The simulator does not show your edited file by magic. You edit the **source
code**, run a **build** to prepare it for Macle, and then look at the result
in the simulator.

```text
file you edit → Macle build → simulator screen
```

In the starter, clicking the button also changes the tap count. That is a
small example of an **event** (something the user does) changing **state**
(information the app remembers while it is open).

## Step by step

1. Make sure the starter is running from Day 2.
2. In `starter-template/src/pages/index/index.tsx`, find the words
   `Hello, Telebirr`.
3. Change them to `Hello from my Macle app`. Save the file.
4. In the terminal, go to the `starter-template/` folder if you are not
   already there, then run:

   ```sh
   npm run build:macle
   ```

5. Refresh the simulator page. If the new message does not appear, run
   `npm run sim:macle` again and check the address it prints.
6. Click **Try an event**. The tap count should increase.

## What happened?

- The file in `src/` is the source you changed.
- The build made Macle-ready output files.
- The simulator opened those files.
- The button click changed the number shown on the screen.

Some build output files may have names such as `.maml`. They are generated
files: look at them if a lesson asks you to, but do not edit them. A new
build can replace them.

## Check your understanding

If the simulator still shows the old message, what should you check first?
Make sure you saved the source file, rebuilt the app, and refreshed the
simulator.

## Save your progress

Write down the file you changed and the command you used to build it. In Day
4, you will find the file that tells the app which screen to open.
