# End of Shift — Bay Sort Challenge

A Three.js + GSAP warehouse sorting mini-game prototype.

## What is included

- Fixed-camera warehouse scene
- 12 draggable pallets
- 12 color-coded bay slots
- Snap-to-bay placement logic
- Combo scoring
- Timer pressure
- Win / lose screens
- HUD overlay
- Lightweight synthesized sound effects
- Clean file structure so you can extend it into pallet racking later

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Main folders

- `src/core` — app bootstrap, renderer, camera, loop
- `src/game` — timer, score, combo, state, game flow
- `src/world` — warehouse floor, bays, pallets, ghost preview
- `src/input` — pointer, raycasting, dragging, snapping
- `src/fx` — GSAP motion, camera punch, sound, highlighting
- `src/ui` — HUD and overlays
- `src/data` — level layout and type data

## Suggested next upgrades

1. Add mobile/touch dragging
2. Add daily challenge layouts
3. Add shareable results card capture
4. Add pallet-racking hard mode
5. Add backend leaderboard

