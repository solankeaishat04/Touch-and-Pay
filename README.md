# Touch and Pay - Dynamic Documentation Platform

An interactive, responsive, and dynamic system for managing and displaying corporate documentation (Terms and Conditions, Privacy Policies, and Legal frameworks) powered by Next.js, TypeScript, and Sanity.io.

This architecture enables non-technical content teams to edit terms dynamically from a headless CMS while keeping the frontend performant, fully animated, and highly scannable using an automated scroll-spy sidebar tracking system.

## 🚀 Key Features

*   **Dynamic Sanity.io Schema Integration**: Complete management of legal sections, slugs, and text nodes directly within Sanity Studio.
*   **Automated Scroll-Spy Tracking**: Sidebar navigation automatically highlights the active reading region via the `IntersectionObserver` API as the user scrolls.
*   **Intuitive Anchored Scrolling**: Clickable sidebar links calculate layout offsets and smoothly scroll directly to target clauses.
*   **Sophisticated Fluid Animations**: Smooth slide, fade, and zoom-in layout shifts engineered with Framer Motion.
*   **Zero System Performance Overhead**: Server-side page data rendering with strict data safety boundaries to completely avoid layout breaks or visual dropouts.

---

## 🛠️ Architecture Stack

*   **Framework**: Next.js (App Router)
*   **Languages**: TypeScript, Semantic HTML5
*   **Styles & Layout**: Tailwind CSS
*   **Content Engine**: Sanity.io Headless CMS & Portable Text
*   **Animation Engine**: Framer Motion
*   **Icons**: Lucide React

---

## 📂 Setup & Installation

Ensure you have your environment variables for Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`) properly configured in your `.env.local` file.

### 1. Install Dependencies
Install all required UI, interaction, and motion libraries cleanly using `pnpm`:
```bash
pnpm add framer-motion lucide-react