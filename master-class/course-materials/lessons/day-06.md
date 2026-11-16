# Day 6 — Layout and styling in the Macle view

**Estimated time:** 5–10 minute reading, 25 minute styling lab  
**Goal:** You build a readable view for the Macle target and verify its
layout in the simulator at more than one viewport.
**Source:** [Day 6 page TSX](./code/day-06-to-09/day-06/index.tsx) ·
[stylesheet](./code/day-06-to-09/day-06/index.css)

## In simple words

You will change how the sample screen looks. A responsive layout adjusts to
fit a small or large screen. You will build it, then check that the text and
product card still fit.

## Key concepts

A Mini App is used in a constrained viewport, often with touch input.
Readable hierarchy and reliable spacing matter more than decorative effects.
Taro projects commonly use responsive units such as `rpx`; the build
configuration controls how design dimensions are transformed. Check the
project's configured design width rather than assuming a conversion.

Flexbox is a practical foundation for cards and rows. Use spacing,
alignment, and a small set of colors consistently. Avoid relying on CSS
features until you know the target runtime supports them. Inspect both the
compiled style and the rendered result when layout differs from expectation.

A screenshot at one size can conceal overflow. Test at more than one
viewport and make long content behave sensibly.

For example, the sample card uses a flexible text column instead of a fixed
width:

```css
.coffee-card {
  display: flex;
  align-items: flex-start;
  padding: 24rpx;
}

.coffee-card__body {
  min-width: 0;
  flex: 1;
}
```

The card can use the space available inside its parent. `min-width: 0` lets
the text column shrink so a long product name does not force the entire row
to overflow. `rpx` follows the project's configured design-width transform;
it is not a guarantee of identical physical size on every device.

## Step-by-step tutorial

Open the starter page stylesheet. Add a column layout, a heading scale, and
a card with padding and rounded corners. Build and inspect it. Resize the
simulator viewport and identify any fixed-width assumptions.

## Practice

Style yesterday's profile card. Set a clear heading, muted secondary text,
consistent gaps, and a button with a large enough touch area. Test with a
long name and a longer detail string. Use the project's supported stylesheet
format; do not rename output extensions by hand.

## Review questions

**Question:** Why might a fixed 350-pixel card overflow on a narrow device? You
should identify that the design assumed one viewport width and did not
account for device scaling or available content width.

## Apply it

Capture two viewport sizes and list one thing that changed. Improve the
layout so neither view has clipped text or horizontal overflow. Record any
runtime-specific style behavior that needs documentation verification.

## Macle view layout tutorial: step by step

1. **Start from a known build.** Open the starter page and note its current
   padding, width behavior, and typography. Make a copy before replacing it
   with the [Day 6 example](./code/day-06-to-09/day-06/).
2. **Read the layout before styling details.** `.lesson-page` is a flex column
   with padding. The page content should use the available width rather than
   a fixed pixel width. `min-height` allows short screens to fill the view but
   does not force the card to a fixed height.
3. **Follow the card structure.** The icon is a fixed-size flex child with
   `flex-shrink: 0`; the text body uses `min-width: 0` and `flex: 1`. These
   prevent a long description from forcing the row wider than its parent.
4. **Use a type scale and spacing rhythm.** The eyebrow is small and
   letter-spaced, the title is strongest, and the description is secondary.
   The same spacing values recur rather than being chosen independently on
   each element.
5. **Test content, not only the sample.** Replace the product name with a
   long one and the description with two lines. Inspect the narrowest viewport
   available. Record clipping, overflow, and whether the price remains
   readable.

`rpx` is transformed using the project's configured design width. It is not
a promise that every device will render at an identical physical size. Avoid
using `width: 750rpx` as a universal full-width shortcut; let the card flow
inside its parent unless a measured design requirement says otherwise.

## Common mistakes and recovery

- **The card overflows:** remove a fixed width, set `min-width: 0` on the
  flexible text column, and verify long words and labels.
- **The title is clipped vertically:** check line-height and parent height
  before shrinking the font.
- **Styles appear unchanged:** confirm the imported stylesheet path, rebuild
  the Macle output, and reload the fresh output rather than a stale target.
- **A style works in a browser but not the simulator:** reduce to one rule,
  verify target support, and use a simpler layout instead of stacking
  unsupported CSS workarounds.
