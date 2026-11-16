# Day 5 — Make your first Macle screen

**Time:** About 25 minutes
**You will:** Change the starter screen and see your change in the simulator.

## What you are making

You will change the starter's welcome screen into a sample coffee product
screen. You do not need to understand every line of code. For now, notice
that the words between `<Text>` and `</Text>` appear on the screen.

## Step by step

1. Open `master-class/starter-template/src/pages/index/index.tsx`.
2. Select all the text in that file and replace it with the example below.
3. Save the file.
4. Open a terminal in `master-class/starter-template/`.
5. Run `npm run build:macle` and wait for “Compiled successfully.”
6. If the simulator is already running, refresh its page. Otherwise run
   `npm run sim:macle`, then open `http://localhost:30005`.
7. Check that the screen shows the coffee name, description, and price.

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

## Understand just enough

- `<View>` is a box that holds other things on the screen.
- Each `<Text>` line shows words on the screen.
- The coffee details are examples. They are not loaded from a shop and are
  not a real offer.
- The Macle build turns this saved example into an app the simulator can
  open. If you change the file, build again.

## Try one change

1. Change `Yirgacheffe Coffee` to another name.
2. Save the file.
3. Run `npm run build:macle` again.
4. Refresh the simulator.
5. Check that your new name appears.

## If it does not work

- If the build reports an error, check that the example was copied
  completely and that the quote marks and brackets match.
- If the screen has the old name, save the file, build again, then refresh.
- If the page is blank, check the first build error and make sure you are
  running the simulator from `starter-template/`.

## Check your understanding

Which file did you change? What command prepared the app for the Macle
simulator? Write those two answers down. That is enough for today.
