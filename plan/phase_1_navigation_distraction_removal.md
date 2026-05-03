# Phase 1: Navigation & Distraction Removal

## Objective
Eliminate standard website leaks by removing the header navigation links, keeping users hyper-focused on the primary conversion goal.

## Target File
`public/naslogic.html`

## Exact Steps
1. Open `public/naslogic.html`.
2. Locate the `<nav class="nav">` block inside the `<header class="header">`.
3. You will see links for:
   - `<a href="#autopsy">The Truth</a>`
   - `<a href="#pricing">Pricing</a>`
   - `<a href="/blog/landing-page-guide">Blog</a>`
4. **DELETE** all three of these `<a>` tags.
5. Keep the `<a href="/" class="logo">NASLOGIC</a>` intact so the branding remains.
6. Keep the "START PROJECT" button (`<a href="#pricing" class="btn btn-outline" ...>`) as it is a direct conversion path, or remove it if we want zero distractions. (We will keep it for now as a secondary CTA).

## Verification
- Load the page. The top right navigation should only contain the "START PROJECT" button, and the logo on the left.
