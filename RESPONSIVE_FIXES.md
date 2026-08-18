# Rendering + Responsive Fixes

## Root cause

The old portfolio had a structural rendering dependency: section headings existed in `index.html`, but the important data lived inside containers that were populated only by `script.js`.

For example, the original HTML contained empty containers for projects and skills, while JavaScript later executed `innerHTML = ...` to create their content. The uploaded PDF from August 18 shows the resulting failure clearly: the **Projects** and **Skills** headings are present on page 3, but the project cards and skill groups are missing. fileciteturn3file11

The existing CSS had already been partially changed so `.reveal`, `.project-card`, `.skill-card`, and `.cert-card` defaulted to `opacity: 1`, which reduced the animation-related failure mode. However, that could not solve the deeper problem: if JavaScript did not finish rendering, there was simply no project/skill DOM to display.

## Fix

Critical content is now rendered directly in `index.html`:

- 12 projects
- 8 skill groups
- 3 experience entries
- 2 education entries
- 2 certifications
- 6 expandable project case studies

JavaScript no longer creates the critical content.

## Progressive enhancement

`script.js` is limited to non-critical behavior:

- mobile navigation
- active navigation indicator
- project filtering
- footer year

If JavaScript fails, all project cards and skill groups remain visible.

## Responsive verification

Tested at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 820px
- 1024px
- 1280px
- 1440px
- 1920px

Result: **0px horizontal overflow at every tested viewport.**

## Print / PDF

The print stylesheet:

- removes sticky navigation behavior
- removes interactive filters
- prevents project cards from being split unnecessarily
- expands closed case-study content for print
- removes decorative background noise
- keeps content in the document even without JavaScript

Browser print emulation retained all 12 project cards and all 8 skill groups.

## Accessibility / motion

The content is visible without animation. `prefers-reduced-motion: reduce` disables meaningful motion while preserving the complete layout and content.
