# Design Guidelines for Nainix Dev - Amazon Affiliate Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern e-commerce and review platforms like Wirecutter, CNET, and Amazon itself, while maintaining a clean, professional aesthetic optimized for product discovery and conversion.

## Core Design Principles
- **Conversion-Focused**: Every page guides users toward product discovery and affiliate link clicks
- **Trust & Credibility**: Professional presentation that builds confidence in reviews and recommendations
- **Speed & Clarity**: Fast-loading, scannable layouts with clear hierarchy
- **Responsive Excellence**: Seamless experience across all devices

## Typography System
**Font Family**: Poppins (primary) with Inter as fallback
- **Headlines (H1)**: 2.5rem - 3.5rem, font-weight 700, for hero taglines and page titles
- **Section Titles (H2)**: 2rem - 2.5rem, font-weight 600, for category headers
- **Subsections (H3)**: 1.5rem - 1.75rem, font-weight 600, for product names and blog titles
- **Body Text**: 1rem, font-weight 400, line-height 1.6 for readability
- **Small Text**: 0.875rem for metadata, ratings, and footer links

## Color Palette
**Base Theme (Light Mode)**:
- Background: White (#FFFFFF)
- Secondary Background: Light Gray (#F8F9FA)
- Text Primary: Dark Gray (#212529)
- Text Secondary: Medium Gray (#6C757D)

**Accent Colors**:
- Primary Blue: #1E90FF (CTAs, links, active states)
- Gold Accent: #FFD700 (star ratings, badges, highlights)
- Success Green: #28A745 (positive reviews, "in stock")
- Alert Red: #DC3545 (limited time offers)

**Dark Mode**:
- Background: #1A1A1A
- Secondary Background: #2D2D2D
- Text Primary: #F8F9FA
- Inverted accent applications

## Layout System
**Spacing Scale**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section Padding: py-20 (desktop), py-12 (mobile)
- Container Max Width: max-w-7xl for full-width sections, max-w-6xl for content
- Card Spacing: gap-6 (desktop), gap-4 (mobile)
- Element Margins: mb-8 for section separations, mb-4 for related elements

## Component Library

### Navigation
- **Sticky Header**: Fixed top navigation with white background (light mode), dark background (dark mode)
- Height: 80px with logo left, category links center, search + dark mode toggle right
- Search bar: Rounded input with icon, max-width 400px
- Mobile: Hamburger menu with slide-out drawer

### Hero Section
- Full-width banner with gradient overlay (blue to transparent)
- Large heading "Nainix Dev" with tagline "Smart Shopping with Smart Reviews"
- Height: 60vh minimum
- CTA button: "Explore Deals" with rounded corners, soft shadow, hover glow effect

### Product Cards
- Card dimensions: Square aspect ratio for product images
- White background with subtle border and hover lift (translateY -4px)
- Soft shadow: shadow-md default, shadow-xl on hover
- Star ratings in gold with count
- Price display in larger bold text
- "Buy on Amazon" button: Blue background, white text, rounded-lg, full-width within card
- Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)

### Buttons
- **Primary CTA**: Blue background (#1E90FF), white text, px-8 py-3, rounded-lg, shadow-md
- **Secondary**: White background, blue border and text, same padding
- **Hover States**: Glow effect with box-shadow increase and slight scale (1.02)
- **Buttons on Images**: Blurred background (backdrop-blur-sm), semi-transparent white/dark overlay

### Blog Cards
- Horizontal layout on desktop (image left, content right)
- Featured image with 16:9 aspect ratio
- Category tag in gold
- Read time and date metadata
- Hover: image zoom effect within container

### Forms
- Rounded inputs (rounded-lg) with light gray borders
- Focus state: Blue border, shadow glow
- Newsletter box: Centered with email input + submit button combo
- Contact form: Stacked layout with generous spacing

### Footer
- Three columns: Quick Links, Categories, Social + Newsletter
- Dark background (#212529) with light text
- Copyright and Amazon disclaimer at bottom
- Back-to-top floating button (bottom-right, rounded-full, blue background)

## Page-Specific Layouts

### Homepage
1. Hero banner with search overlay
2. Featured Categories (4-column grid with icons and links)
3. "Top Deals Today" carousel (auto-scroll with manual controls)
4. Newsletter subscription (centered box with background accent)
5. Footer

### Category Pages
- Breadcrumb navigation at top
- Filter sidebar (left, 25% width) with price range, ratings, and brand filters
- Product grid (right, 75% width) with sorting dropdown
- Pagination at bottom

### Product Review Template
- Large product image gallery (left, 50%)
- Product info, ratings, price, CTA (right, 50%)
- Tabbed sections: Description, Features, Pros & Cons, User Reviews
- Comparison table: Side-by-side similar products (3-column grid)
- Related products carousel at bottom

### Blog Article
- Hero image (full-width, 400px height)
- Single-column content (max-w-3xl) with sidebar on desktop
- Sidebar: Related products, popular articles, newsletter signup
- In-content product recommendations (cards within text flow)

## Images

### Hero Images
- **Homepage Hero**: Large lifestyle image showing happy shoppers or product collage with gradient overlay (1920x800px minimum)
- **Category Heroes**: Category-specific imagery (electronics setup, fashion lifestyle, kitchen scene, etc.)

### Product Images
- Clean white background product shots (600x600px)
- Gallery images showing product from multiple angles
- Lifestyle context shots for blog content

### Blog Featured Images
- High-quality relevant imagery (1200x675px, 16:9 ratio)
- Overlay text-safe areas for article titles

### Icons & Graphics
- Use Font Awesome for UI icons (shopping cart, search, user, etc.)
- Gold star icons for ratings
- Category icons (custom or from icon library)

## Animations & Interactions
- Smooth page transitions with fade effects
- Product card hover: lift with shadow increase (300ms ease)
- Carousel auto-advance: 5 seconds with smooth slide transitions
- Dark mode toggle: fade transition for theme switch (200ms)
- Scroll-triggered fade-in for sections (subtle, once per session)
- Button hover glow: box-shadow expansion (200ms ease)
- **Minimize distracting animations**: Focus on purposeful micro-interactions

## SEO & Performance
- Lazy loading for images below fold
- Optimized image formats (WebP with fallbacks)
- Meta tags with product schema markup
- Open Graph tags for social sharing
- Fast loading prioritization (minimal animation overhead)

## Accessibility
- WCAG AA contrast ratios for all text
- Focus indicators for keyboard navigation
- Alt text for all product images
- ARIA labels for interactive elements
- Responsive text scaling