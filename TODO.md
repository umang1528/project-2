# TODO — Premium Cinematic Admin Dashboard Architecture

## Step 1: Repo analysis (done)
- Identified current navigation: `ViewType` state machine in `src/App.tsx`.
- Inspected Tailwind v4 theme tokens in `src/index.css`.

## Step 2: Routing migration plan (approved)
- Introduce `react-router-dom`.
- Migrate public navigation from `currentView` to proper routes:
  - `/` → Home
  - `/archives` → Archive
  - `/about` → About
  - `/education` → Education
- Add `/admin` route and dashboard subroutes.

## Step 3: Admin auth architecture
- Create Zustand `useUIStore`/`useAuthStore` (or embed in `useUIStore`) for:
  - login state
  - protected route gating
  - persistence (localStorage)

## Step 4: Admin layout architecture
- Create `/admin` layout containing:
  - collapsible animated sidebar (lucide icons + active route indicator)
  - topbar with search, notifications, profile, breadcrumbs
  - main content with smooth page transitions

## Step 5: State management (Zustand)
- Implement stores:
  - `useThemeStore`
  - `useProjectStore`
  - `useAnimationStore`
  - `useUIStore`

## Step 6: Theme engine
- Implement theme schema + presets:
  - background/foreground/accent/secondary/border/glass/typography/motionPreset
- Live switching + per-page/per-route themes + persistence.

## Step 7: Animation system
- Create `src/animations/*` modules per spec:
  - fade, reveal, magnetic, parallax, text, scroll
- Integrate with Framer Motion / motion/react components.

## Step 8: Dynamic CMS-ready data layer
- Define admin data schemas for:
  - projects, media assets, homepage sections, skills, education, resume, social links
- Extend `apiService` (mock/in-memory + future backend-ready).

## Step 9: Admin pages
- Implement pages:
  - `/admin/dashboard`
  - `/admin/projects` (CRUD + reorder + drag & drop + upload media + theme per project)
  - `/admin/media`
  - `/admin/themes`
  - `/admin/analytics`
  - `/admin/settings`
  - `/admin/sections`

## Step 10: Navbar admin login button
- Update existing `src/components/layout/Navbar.tsx`:
  - add premium black LOGIN button at end of desktop nav
  - add to mobile menu
  - route to `/admin`

## Step 11: Performance
- Lazy load admin pages + dynamic imports.
- Component memoization where appropriate.

## Step 12: Testing
- `npm run lint` / `npm run build`.

