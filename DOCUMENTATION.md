# Documentation

## 1. Supabase Integration
Implemented the initial setup for Supabase integration to persist the "Scaglioni" configuration.

### Files Created
- **Migration File**: `supabase/migrations/20240120000000_create_scaglioni_table.sql`
  - Creates the `scaglioni` table.
  - Inserts default data.
  - Sets up RLS policies (permissive for now).
- **Environment**: `.env.example` created with necessary keys.

### Database Schema (`scaglioni` table)
| Column        | Type      | Description |
|---------------|-----------|-------------|
| id            | bigint    | Primary Key |
| soglia        | numeric   | Threshold start value |
| soglia_fine   | numeric   | Threshold end value (NULL for infinity) |
| percentuale   | numeric   | Percentage applied |
| descrizione   | text      | Description label |
| created_at    | timestamp | Creation timestamp |

## 2. Dark Mode Implementation
Implemented a persistent Dark Mode switch using `ThemeProvider` context and Tailwind CSS.

### Components
- **`src/components/theme-provider.tsx`**: Context provider that manages the theme state (`light`, `dark`, `system`) and persists it to `localStorage` (key: `vite-ui-theme`).
- **`src/components/mode-toggle.tsx`**: UI component (button/dropdown) to switch between themes.

### Usage
- The application is wrapped in `<ThemeProvider>` in `src/App.tsx`.
- The `ModeToggle` button is placed in the top-right corner of the `PatrimonioCalculator` page.

## 3. Mobile UX Optimization
Optimized the application for mobile devices.

### Changes
- **Numeric Keypad**: All numeric inputs (`Patrimonio` input, `ScaglioniConfig` inputs) now use `inputMode="decimal"` and `type="text"` (or `number`) to trigger the numeric keypad on mobile devices while maintaining formatting capabilities.
- **Layout**:
    - Increased touch targets for inputs and buttons (`h-12`).
    - Implemented a responsive flex layout for the main calculator controls (`flex-col` on mobile, `flex-row` on desktop).
    - Improved stacking of action buttons ("Calcola", "Reset") on mobile.

## 4. UI/UX Revolution (Fintech Style)
Complete redesign of the mobile experience to match modern professional financial apps.

### Key Features
- **Hero Input**: A large, centered, borderless input for the patrimony amount, emphasizing it as the primary action.
- **Sticky Footer Action**: The "Calcola" (and "Rest") button is fixed to the bottom of the screen, ensuring easy reachability on all device sizes.
- **Cleaner Information Display**:
    - Removed heavy "Card" containers for scaglioni list items, replacing them with a sleek, divided list view.
    - Improved typography hierarchy in the result view.
    - Animated result entrance.
- **Improved Configuration UI**: The Scaglioni configuration modal now uses a more compact, mobile-friendly list layout for editing tiers.

### Desktop Adaptation (Dashboard)
On larger screens (>= md), the application transforms into a single-screen **Dashboard**, ensuring all critical information is visible without scrolling the page:
-   **Full Screen**: The layout is constrained to `h-screen`, eliminating window scrollbars.
-   **Top Row**:
    -   **Left**: Input Section (Patrimony & Actions).
    -   **Right**: Result Summary (Total Amount) - clearly separated.
-   **Bottom Row**:
    -   **Full Width**: Scrollable list for Details or Configuration.
-   **Visuals**: Clean division of space with separate zones for Input and Output.

## 6. PWA (Progressive Web App) Support
The application is now a fully functional PWA, installable on mobile and desktop.

### Features
-   **Installable**: Manifest file allows "Add to Home Screen" triggering native-like experience.
-   **Offline Capable**: Service Worker caches assets for offline use (auto-update configured).
-   **Icons**: configured for various device sizes.

### Technical Details
-   **Plugin**: Used `vite-plugin-pwa`.
-   **Configuration**: Auto-update strategy, standard manifest properties.
-   **Assets**: Icons located in `public/` directory (replace placeholders for production).

### Configuration
- **Base Path**: Updated `vite.config.ts` to use `/calcolapercentuali/` as the base path.
- **Homepage**: Added `homepage` field to `package.json`.
- **Workflow**: Created `.github/workflows/deploy.yml` to automatically build and deploy to GitHub Pages on push to `main`.

### Troubleshooting
-   **Missing Secrets**: The build will fail if Supabase secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are not configured in GitHub repository secrets.
-   **404 on Refresh**: Added a step in the deployment workflow to copy `index.html` to `404.html` to handle client-side routing.
-   **Basename**: Configured `BrowserRouter` with `basename={import.meta.env.BASE_URL}` to respect the `/calcolapercentuali/` path.

## 7. Fixed Scaglioni Setups
- [2026-10-24]: Added two selectable progressive rate setups
- *Details*: Added an upper segmented switch labeled “1” and “2”. Setup 1 retains the existing default rates; setup 2 applies the supplied seven bands and rates. Selecting a setup clears any previous result. Removed the settings dialog and all in-app editing of rates.
- *Tech Notes*: Added `ALTERNATIVE_SCAGLIONI` in `src/types/patrimonio.ts`. Both setups use the existing progressive calculator. Removed the obsolete Scaglioni editor, its Supabase service, and its Supabase client dependency from the app runtime. No new dependencies or manual actions are required.

## 8. GitHub Pages URL
- [2026-10-24]: Aligned the project homepage with the simo-hue repository
- *Details*: Updated the homepage metadata to point to the simo-hue Pages site. The older ServiziPerTribunali URL still hosts an older deployment; the current build is served from the simo-hue URL.
- *Tech Notes*: Updated the `homepage` field in `package.json` to `https://simo-hue.github.io/calcolapercentuali/`.

## 9. Mobile and installed PWA layout
- [2026-10-24]: Improved phone layout and iOS standalone display
- *Details*: Reworked the mobile header so the setup selector and theme control stay clear of the status bar and each other. Reduced the calculator's vertical footprint, tightened the rate list on small screens, removed automatic input focus, and allowed page scrolling when content exceeds the available height.
- *Tech Notes*: Added `viewport-fit=cover`, safe-area padding, dynamic viewport sizing, Italian document language, Apple web app metadata, and standalone PWA manifest display with a dark theme/background color.
