# Phase 2: Hero Layout & Image Sizing

## Objective
Increase the visual dominance of the hero image by giving it more space, taking advantage of the empty dark space on the right side of the screen.

## Target File
`public/naslogic.html`

## Exact Steps
1. Open `public/naslogic.html`.
2. Locate the Hero section `<section class="hero fade-in">`.
3. Locate the `.container` `div` immediately inside it: `<div class="container" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px; text-align: left;">`.
4. **MODIFY** the container's inline style to expand its maximum width. Add `max-width: 1400px;` (overriding the default 1200px CSS variable).
   *Example:* `<div class="container" style="max-width: 1400px; display: flex; flex-wrap: wrap; align-items: center; gap: 40px; text-align: left;">`
5. Locate the `div` wrapping the `<img>` tag. It currently has `style="flex: 1.3 1 500px; ..."`
6. **MODIFY** the flex ratio from `1.3` to `2` to make it larger: `style="flex: 2 1 600px; border-radius: 12px; overflow: hidden; border: 1px solid var(--surface-border); box-shadow: 0 20px 40px rgba(0,0,0,0.4);"`

## Verification
- Load the page on desktop. The image of the smartphone notifications should be noticeably larger and occupy the previously empty space on the far right.
