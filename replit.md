# Jewel India - 3D Jewelry Workshop Platform

## Project Overview
An interactive platform to explore jewelry workshops across India. Features an SVG-based Indian map with clickable states, seller listings, workshop details, and a jewelry catalog with 3D viewing capabilities.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/UI + Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express.js
- **Data**: In-memory storage with static data
- **Routing**: Wouter

## Project Structure
```
client/
  src/
    components/
      header.tsx          - Navigation header with theme toggle
      footer.tsx          - Site footer with newsletter
      india-map.tsx       - Interactive SVG India map
      state-sidebar.tsx   - Slide-out panel showing state sellers
      seller-card.tsx     - Seller preview card component
      jewelry-card.tsx    - Jewelry item card with quick view
      jewelry-modal.tsx   - 3D jewelry viewer modal
      theme-toggle.tsx    - Dark/light mode toggle
    pages/
      home.tsx            - Map exploration homepage
      sellers.tsx         - All sellers listing with filters
      catalog.tsx         - Jewelry catalog with categories
      seller-detail.tsx   - Individual seller/workshop page
      about.tsx           - About the platform
    lib/
      static-data.ts      - Static data for sellers, jewelry, states
server/
  storage.ts              - Data storage interface
  routes.ts               - API endpoints
shared/
  schema.ts               - TypeScript interfaces
```

## Key Features
1. **Interactive India Map**: Click states to view local jewelry sellers
2. **Seller Listings**: Filter by state, specialty, search
3. **Jewelry Catalog**: Categories, materials, price filtering
4. **3D Jewelry Viewer**: Rotate and zoom jewelry pieces
5. **Workshop Details**: Full seller profiles with gallery

## Design System
- **Fonts**: Playfair Display (headings), Inter (body)
- **Colors**: Warm gold primary (#C17F24), cream backgrounds
- **Theme**: Dark/light mode support

## Running the Project
```bash
npm run dev
```
Frontend runs on port 5000.

## API Endpoints
- `GET /api/states` - All states with seller counts
- `GET /api/sellers` - All sellers (optional: ?state=XX&specialty=YY)
- `GET /api/sellers/:id` - Single seller details
- `GET /api/sellers/:id/workshop` - Seller's workshop info
- `GET /api/jewelry` - All jewelry items (optional: ?category=XX)
- `GET /api/jewelry/:id` - Single jewelry item

## Recent Changes
- Initial MVP implementation with interactive map, seller listings, catalog
- Static data for 12 sellers across major jewelry states
- 12 jewelry items across 6 categories
