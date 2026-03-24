# Megha Mehta React Migration

This is a Vite + React conversion of the uploaded static project.

## Included routes
- `/` — landing page
- `/blog` — guides / neighbourhood insights
- `/property-list` — searchable listings + map
- `/property-details?id=...` — property detail template
- `/tools` — footfall tool + email generator
- `/warehouse` — warehouse + 3D pallet game page

## Run locally
```bash
npm install
npm run dev
```

## Notes
- The warehouse page is preserved as the approved one-file 3D page and loaded through a React route in an iframe so its camera/game behavior stays intact.
- Lead capture, hero shortlist request, and tour request forms store demo data in `localStorage`.
- Listings and blog content live in `src/data/siteData.js`.
