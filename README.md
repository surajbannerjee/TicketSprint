# TicketSprint

A modern web application built with **Next.js**, **Tailwind CSS v4**, **Shadcn UI**, and **100% JavaScript** (No TypeScript).

---

## 🎨 Design System & Brand Palette

The colors and fonts are configured in [`src/app/globals.css`](file:///D:/TicketSprint/src/app/globals.css) and [`src/app/layout.js`](file:///D:/TicketSprint/src/app/layout.js) based on the brand specification:

### Colors
- **Primary**: `#FF2E63` (Vibrant Pink/Red)
- **Secondary**: `#6366F1` (Action Indigo)
- **Tertiary**: `#10B981` (Emerald Green)
- **Neutral / Background**: `#0B0D14` (Deep Dark Canvas)

### Typography
- **Headline**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (`font-heading`)
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) (`font-sans`)
- **Label**: [Inter](https://fonts.google.com/specimen/Inter) (`font-sans uppercase text-xs tracking-wider`)

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: **JavaScript** (`.js`, `.jsx`) — *No TypeScript*
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (`button`, `card`, `badge`, `input`, etc.)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🧩 Adding More Shadcn UI Components

Since the project is configured for JavaScript (`tsx: false` in `components.json`), any component you install will automatically be created in `.jsx`:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
```
