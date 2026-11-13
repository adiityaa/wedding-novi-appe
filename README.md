
# Jalan Sarta — Wedding Invitation (Appe & Novi)

A Next.js (App Router) wedding invitation website with scroll-snap navigation, photo gallery with swipe support, and background music.

**Event:** Appe & Novi  
**Language:** Indonesian / English

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Components](#components)
- [Styling](#styling)
- [Responsive Design](#responsive-design)
- [Customization](#customization)
- [Deployment](#deployment)

---

## 🚀 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.4.3 |
| UI Library | React | 19 |
| Language | TypeScript | 5.7.3 |
| Styling | Tailwind CSS | 4.3.3 |
| Animations | Framer Motion | 14.7.1 |
| Icons | Lucide React | 1.16.0 |
| UI Primitives | @base-ui/react | 1.5.0 |
| Styling Utils | class-variance-authority, clsx, tailwind-merge | latest |
| Analytics | @vercel/analytics | 1.6.1 |
| Package Manager | pnpm | 12.3.4 |

---

## 📁 Project Structure

```
appe_novi/
├── app/
│   ├── layout.tsx          # Root layout, metadata, Analytics
│   ├── page.tsx            # Main page — scroll-snap navigation + audio
│   └── globals.css         # All styles including section-specific CSS
├── components/
│   ├── ui/
│   │   └── button.tsx      # shadcn-style Button primitive
│   └── sections/
│       ├── Cover.tsx       # Cover image + chevron arrow
│       ├── Story.tsx       # Story section (storyPages array + AnimatePresence)
│       ├── Details.tsx     # Events (Pemberkatan, Resepsi) + map
│       ├── Gallery.tsx     # Photo carousel with swipe + prev/next
│       └── Closing.tsx     # Closing message + credits + map iframe
│       └── Guest.tsx       # Greeting page for invited guests
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── public/
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── components.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 🛠 Getting Started

### Prerequisites


---

## 🧩 Components

### `page.tsx` (Root Page)

The main entry point. Contains:

- **Scroll-snap navigation** — wheel, touch swipe, and "Next" cue buttons move between sections
- **Background audio** — auto-unlocks on first user interaction; mute toggle button
- **6 sections**: Guest → Cover → Story → Details → Gallery → Closing

### `Guest.tsx` (`components/sections/Guest.tsx`)

- Greeting page for invited guests ("Dear Tamu Undangan")
- Animated entrance with Framer Motion (fade-in + slide up)
- Accepts `ref` for IntersectionObserver audio trigger
- Animated chevron arrow (bounce animation) to proceed

### `Cover.tsx` (`components/sections/Cover.tsx`)

- Cover image with wash overlay
- Accepts `ref` for IntersectionObserver audio trigger

### `Story.tsx` (`components/sections/Story.tsx`)

- Story section with `storyPages` array containing the full narrative
- AnimatePresence + motion for page transitions
- ChevronDown button to proceed to next section

### `Details.tsx` (`components/sections/Details.tsx`)

- Event details: Pemberkatan & Resepsi
- Location addresses
- Google Maps embed iframe
- "Open directions" link

### `Gallery.tsx` (`components/sections/Gallery.tsx`)

- Photo carousel with Framer Motion drag gestures
- **Swipe support** — drag left/right to change photos
- Prev/Next navigation buttons
- Auto-wrap navigation
- Image counter (01 / 03, etc.)

### `Closing.tsx` (`components/sections/Closing.tsx`)

- Closing message: "Kehadiranmu sangat berarti bagi kami"
- Couple names: Appe & Novi
- Date and credits
- Google Maps iframe for venue

---

## 🎨 Styling

All styles are contained in **`app/globals.css`**, including:

- Tailwind CSS and tw-animate-css imports
- Minion Variable Concept font-face
- CSS custom properties (`--ink`, `--paper`, `--olive`, `--line`)
- Section-specific styles: `.cover`, `.story`, `.details`, `.gallery`, `.closing`, `.gallery-nav`, `.map-card`, etc.
- Responsive media queries for mobile (≤700px) and desktop (≥701px)

### Design Tokens

```css
:root {
  --ink: #e9e6dd;
  --paper: #171a13;
  --olive: #303b25;
  --line: rgba(233, 230, 221, 0.24);
}
```

- Background: `#10130e` (dark olive/black)
- Font: Minion Variable Concept (serif)

---

## 📱 Responsive Design

| Viewport | Behavior |
|----------|----------|
| **Mobile (≤700px)** | Full-screen invitation, no frame |
| **Desktop (≥701px)** | Invitation centered in a mobile-sized frame (430px max-width) with rounded corners, shadow, and border |

---

## 🎵 Audio

- Auto-plays on first user interaction (browsers block autoplay)
- Mute toggle button appears after first scroll
- Loops continuously

---

## 🎯 Customization

### Change Couple Names / Date

Edit `Closing.tsx`:
```tsx
<p className="names">Appe &amp; Novi</p>
```

### Change Event Details

Edit `Details.tsx` — update event type, time, location, and Google Maps embed URL.

### Change Story Content

Edit `storyPages` array in `Story.tsx`.

### Change Gallery Images

Edit `gallery` array in `Gallery.tsx` with your image URLs.

### Change Backsound

Update the `<audio src>` attribute in `page.tsx`.

---

## 🚀 Deployment

### Vercel (Recommended)

```powershell
pnpm build
# Then connect your GitHub repo to Vercel or run:
npx vercel
```

### Static Export

`next.config.mjs` has `images.unoptimized: true` which is required for static exports.

---

## 📄 License

ISC

---

## 👥 Credits

- **Couple:** Appe & Novi
- **Design & Code:** Generated via v0
- **Background Music:** SoundHelix example track
- **Images:** Vercel Blob Storage
- **Map:** Google Maps
- **Node.js** (v20+ recommended)
- **pnpm** (packageManager field declares `pnpm@12.3.4`)

### Installation

```powershell
cd c:\laragon\www\wedding-invitation\appe_novi
pnpm install
```

### Development

```powershell
pnpm dev
# or using local next binary directly:
node_modules\.bin\next.cmd dev
```

Open http://localhost:3000

### Production Build

```powershell
pnpm build
pnpm start
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start dev server with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Production server |