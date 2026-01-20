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

### Desktop Adaptation (Unified Card)
On larger screens (>= md), the application transforms into a "Center Stage" Dashboard:
-   **Single Central Card**: A focused, elegant card centered on the screen.
-   **Top-Heavy Input**: The input field is placed at the very top of the card ("Cifra in cima a tutto"), prioritizing data entry above all else.
-   **Integrated Actions**: Action buttons are placed directly below the input for a natural flow.
-   **Context Below**: The Results or Configuration list sits at the bottom, providing context without distracting from the main input.
-   **Visuals**: Uses backdrop blur and soft borders for a premium desktop feel.

## 5. GitHub Pages Deployment
Configured the application for deployment to GitHub Pages using GitHub Actions.

### Configuration
- **Base Path**: Updated `vite.config.ts` to use `/calcolapercentuali/` as the base path.
- **Homepage**: Added `homepage` field to `package.json`.
- **Workflow**: Created `.github/workflows/deploy.yml` to automatically build and deploy to GitHub Pages on push to `main`.
