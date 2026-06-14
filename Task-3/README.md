# ImpactPulse Platform (Task 3)

ImpactPulse is a next-generation transparent NGO platform built with Next.js and React. It is designed to bridge the trust gap between non-profit organizations, donors, and volunteers by displaying verified impact metrics, a public fund allocation breakdown, and an interactive skill-based volunteer matchmaking wizard.

---

## 🚀 Technology Stack

This application is built with modern, production-grade frontend technologies:

* **Framework**: [Next.js 16](https://nextjs.org/) (using the App Router structure)
* **Library**: [React 19](https://react.dev/) (utilizing hooks for active states and client-side rendering)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using utility classes and custom color variables for responsive layout design)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (powering layout shifts, accordion expansions, and entrance transitions)
* **Icons**: [Lucide React](https://lucide.dev/) (system-wide vector iconography)

---

## 🌟 Core Features

1. **Live Impact Footprint**
   * Displays verified community stats (Meals Distributed, Trees Planted, Active Helpers, and Funds Allocated) using card blocks.
   * Includes structural explanations of the transparency reporting loop.

2. **Active Campaign Hub**
   * Responsive list of ongoing campaigns (Education, Food, Animal Care, Cleanliness).
   * Interactive filters that filter campaigns dynamically.
   * Visual progress bars detailing funding status (Raised vs. Target Goal) and clear output metrics.

3. **Public Fund Accountability Breakdown**
   * Uses flat, colored progress bars to display exactly how donations are distributed (Direct Program Costs, Field Operations, Volunteer Resources, and Administrative Overhead).

4. **Skill-Based Volunteer Matcher**
   * A client-side interactive wizard (`VolunteerMatcher.tsx`) allowing potential helpers to filter opportunities based on their skill sets (e.g., Design, Teaching, Web Support, Fundraising).
   * Displays target commitments, vacancy counts (spots left), and project alignment tags.

5. **Community Voices & Stories**
   * Showcases real testimonials from Volunteers, Donors, and Beneficiaries with stylized quotes and avatar fallbacks.

6. **Engagement Center**
   * A functional contact/inquiry form with interactive validation, role selection, and client-side success feedback upon submission.

---

## 📂 Directory Structure

```text
Task-3/
├── public/                     # Static assets
│   ├── logo.png                # Brand Logo
│   └── favicon.png             # Site Favicon
├── src/
│   ├── app/
│   │   ├── globals.css         # Custom utility patterns & core Tailwind settings
│   │   ├── layout.tsx          # Root HTML structure, metadata, & font configuration
│   │   ├── page.tsx            # Main landing page & dashboard assembly code
│   │   └── icon.png            # App icon assets
│   ├── components/
│   │   └── VolunteerMatcher.tsx # Interactive skill-matching filter component
│   └── data/
│       └── mockData.ts         # Mock data models (Causes, Testimonials, Fund distributions)
├── next.config.ts              # Next.js configuration settings
├── tsconfig.json               # TypeScript compiler options
├── tailwind.config.ts          # Tailwind configuration overrides (if applicable)
├── postcss.config.mjs          # PostCSS configuration file
└── package.json                # Project dependencies, scripts, and package settings
```

---

## 🛠️ Local Development & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### Installation
1. Navigate to the `Task-3` folder:
   ```bash
   cd Task-3
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the App
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the live dashboard interface.
