# Design Guidelines: 3D Jewelry Workshop Platform

## Design Approach

**Reference-Based Approach** drawing from premium e-commerce platforms (Etsy, 1stDibs) combined with Indian cultural aesthetics. The platform requires a sophisticated, gallery-like experience that showcases craftsmanship while maintaining intuitive navigation through the interactive map interface.

## Core Design Principles

1. **Visual Hierarchy**: Map-first navigation → State sellers → Individual workshops → 3D catalog
2. **Premium Positioning**: Elegant, spacious layouts that reflect jewelry's luxury nature
3. **Cultural Authenticity**: Subtle incorporation of Indian design patterns without overwhelming
4. **Interactive Depth**: Layered information reveal through smooth transitions

## Typography System

**Primary Font**: Playfair Display (Google Fonts) - Serif for headings, establishing elegance
**Secondary Font**: Inter (Google Fonts) - Sans-serif for body text and UI elements

**Hierarchy**:
- Hero/Map Title: 3xl-4xl, bold weight
- State Names on Map: xl-2xl, semi-bold
- Seller Names: lg-xl, medium weight
- Workshop Details: base-lg, regular weight
- Catalog Item Names: lg, medium weight
- Body Text/Descriptions: sm-base, regular weight
- UI Labels/Metadata: xs-sm, medium weight

## Layout & Spacing System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-6, gap-8
- Margins between elements: mb-4, mb-6, mb-8

**Container Strategy**:
- Full-width map section: w-full with max-w-7xl centered content
- Seller listings: max-w-6xl
- Workshop details: max-w-5xl
- Catalog grid: max-w-7xl

## Component Library

### 1. Interactive Map Interface (Hero Section)

**Layout**: Full viewport height (min-h-screen), centered SVG map
- SVG Indian map with clickable state paths
- State hover effects: scale transform, elevated appearance
- Seller count badges on each state (small circular indicators)
- Zoom controls positioned bottom-right
- Legend/filter panel positioned top-right with backdrop blur

**Map Interactions**:
- Click state → Slide-in sidebar from right showing state sellers
- Hover state → Tooltip with state name and seller count
- Active state remains highlighted while sidebar is open

### 2. State Seller Sidebar

**Dimensions**: 400-500px width, full-height, slide-in from right
- Backdrop overlay with blur effect when active
- Close button (X) top-right corner
- State header with name and total seller count
- Scrollable seller card list with gap-4 spacing
- Each seller card includes:
  - Workshop thumbnail image (16:9 ratio)
  - Seller/workshop name
  - Location/city within state
  - Specialty badges (e.g., "Traditional", "Contemporary", "Gemstone Expert")
  - Star rating and review count
  - "View Workshop" button

### 3. Workshop Detail Page

**Layout Structure** (single column, natural height):
- **Header Section** (py-12):
  - Workshop name and tagline
  - Location breadcrumb (State → City)
  - Contact action buttons (Call, WhatsApp, Email) - inline flex
  - Trust indicators (Years in business, certifications)

- **Workshop Gallery** (py-8):
  - Hero image of workshop (2:1 ratio, max-h-96)
  - Thumbnail gallery below (4-6 images, grid-cols-4)

- **About Workshop** (py-8):
  - Two-column layout (lg:grid-cols-2)
  - Left: Description with max-w-prose
  - Right: Quick facts (Specialties, Established year, Team size)

- **Catalog Preview** (py-12):
  - "Explore Catalog" prominent heading
  - Grid of featured items (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
  - "View Full Catalog" CTA button

### 4. 3D Jewelry Catalog Viewer

**Catalog Grid Page**:
- Filter sidebar (left, 280px wide on desktop, collapsible on mobile)
  - Category filters (Rings, Necklaces, Earrings, Bangles, Bracelets)
  - Material filters with checkboxes
  - Price range slider
- Product grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4, gap-6)

**Product Card Design**:
- Square aspect ratio container
- Jewelry image with hover zoom effect
- Overlay gradient at bottom for text readability
- Product name and price
- Quick view button (triggers 3D modal)

**3D Modal Viewer**:
- Full-screen overlay with dark backdrop
- Canvas area (Three.js): 70% width, centered
- Control panel (right sidebar, 30% width):
  - Product name and price (prominent)
  - Rotation controls (Auto-rotate toggle, Manual rotation hint)
  - Zoom slider
  - Material/finish selector (if variants exist)
  - Detailed specifications accordion
  - Contact seller CTA button
- Close button (X) top-right, large tap target

### 5. Navigation & Global Elements

**Top Navigation Bar**:
- Fixed position, backdrop blur
- Logo left, centered on mobile
- Primary nav items: Home, Explore Map, All Sellers, About
- Search bar (expandable on desktop, separate page on mobile)
- User actions: Wishlist, Account icons

**Footer** (py-16):
- Three-column grid (md:grid-cols-3)
- Column 1: About platform, social links
- Column 2: Quick links (States, Categories, Help)
- Column 3: Contact info, newsletter signup
- Bottom bar: Copyright, legal links

## Micro-Interactions & Animations

Use sparingly for premium feel:
- Map state hover: Subtle scale (1.05) + shadow lift, 200ms ease
- Sidebar slide-in: 300ms ease-out transform
- Product card hover: Image scale 1.1, 400ms ease
- 3D model auto-rotate: Slow, continuous rotation on Y-axis
- Button states: Use built-in Button component states

## Images

**Required Images**:
1. **Workshop Thumbnails**: Authentic workshop interior photos showing craftsmanship (16:9 ratio, ~600x400px)
2. **Jewelry Product Images**: High-quality, white/neutral background, consistent lighting (square, 800x800px minimum)
3. **Workshop Hero Images**: Wide shots of workshop space (2:1 ratio, 1400x700px)
4. **Artisan Photos**: Optional for "Meet the Makers" sections (square or portrait)

**Placement Strategy**:
- No traditional hero image; the interactive map IS the hero element
- Workshop pages use gallery-style image showcases
- Catalog relies heavily on product photography
- Use CDN placeholder service (e.g., Unsplash) for initial development

## Responsive Behavior

**Breakpoints**:
- Mobile (<768px): Stack all layouts, full-width map, bottom sheet for sellers
- Tablet (768px-1024px): Two-column catalog grid, condensed sidebar
- Desktop (>1024px): Full multi-column layouts, persistent sidebars

**Map on Mobile**: 
- Reduce to simplified state list view with map icon indicators
- Tap state → Full-screen seller list
- Keep map available via toggle button

## Accessibility

- Keyboard navigation for map (arrow keys to navigate states, Enter to select)
- ARIA labels for all interactive map elements
- Focus indicators with 2px offset rings
- Minimum touch target size: 44x44px for all interactive elements
- Alt text for all jewelry images describing piece and materials