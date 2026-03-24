# Megha Mehta React Website

This is a Vite + React rebuild of the Megha Mehta commercial leasing website.

## Included pages
- `/` Home / landing page
- `/listings`
- `/listings/:id`
- `/tools`
- `/guides`
- `/listing-type-2` (warehouse animation + game)

## Notes
- The warehouse experience is included inside this same project under `public/warehouse-game/` and embedded on the ListingType2 page.
- The static HTML pages were ported into React with shared header/footer/modal and page-specific logic rewritten for React routing.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
