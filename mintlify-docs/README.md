# SGDS Web Components - Mintlify Documentation

This directory contains the Mintlify documentation for SGDS Web Components.

## 📊 Documentation Status

### ✅ Complete Sections

- **Getting Started** (5/5 pages)
  - Introduction
  - Installation
  - Quick Start
  - Usage Basics
  - Migration Guide

- **Framework Integration** (4/4 pages)
  - React
  - Vue
  - Angular
  - Next.js

- **Utilities** (9/9 pages)
  - Overview
  - Colors
  - Typography
  - Spacing
  - Grid
  - Borders
  - Elevation
  - Opacity
  - Dimension

- **Theming** (3/3 pages)
  - Overview
  - Brand Colors
  - Dark Mode

- **Advanced** (3/6 pages created)
  - Styling
  - Events
  - Form Internals

- **Resources** (3/3 pages)
  - FAQ
  - Changelog
  - Contributing

- **Patterns** (6/14 pages created)
  - Hero
  - CTA
  - Form Layouts
  - Form Validation
  - App Shell - Simple
  - App Shell - Sidebar

### 🔨 Component Pages

**Created (4 examples):**
- Components Overview
- Button
- Input
- Modal

**Remaining (43 components):**
Use the created component pages (button.mdx, input.mdx, modal.mdx) as templates to create the remaining 43 component documentation pages. All 47 components are already listed in `docs.json` navigation.

### 📋 Remaining Pattern Pages (8)

These patterns are referenced in docs.json but need MDX files created:

1. `patterns/feature-sections.mdx`
2. `patterns/card-grids.mdx`
3. `patterns/stats.mdx`
4. `patterns/filters.mdx`
5. `patterns/page-headers.mdx`
6. `patterns/data-viz.mdx`

### 📋 Remaining Advanced Pages (3)

1. `advanced/scoped-elements.mdx`
2. `advanced/accessibility.mdx`
3. `advanced/performance.mdx`

## 🚀 Quick Start

### Prerequisites

```bash
npm install -g mintlify
```

### Local Development

```bash
cd mintlify-docs
mintlify dev
```

This will start a local server at http://localhost:3000

### Validation

```bash
# Check for broken links
mintlify broken-links

# Validate documentation
mintlify validate

# Check accessibility
mintlify a11y
```

## 📸 Screenshots

Screenshots should be captured using the Playwright script:

```bash
# 1. Start Storybook
pnpm storybook

# 2. In another terminal, run screenshot script
node scripts/capture-screenshots.mjs
```

Screenshots will be saved to `/mintlify-docs/images/` with organized subfolders:
- `/images/components/` - Component screenshots
- `/images/patterns/` - Pattern screenshots
- `/images/utilities/` - Utility examples

## 📝 Creating Remaining Pages

### Component Pages Template

Use `components/button.mdx`, `components/input.mdx`, or `components/modal.mdx` as templates. Each component page should include:

1. **Frontmatter** (title, description, icon)
2. **Basic Usage** with code examples
3. **Variants/States** (if applicable)
4. **Framework Examples** (React, Vue, Angular)
5. **API Reference** (Properties, Events, Slots, CSS)
6. **Accessibility** notes
7. **Related Components** links

### Pattern Pages Template

Use `patterns/hero.mdx` or `patterns/form-layouts.mdx` as templates. Include:

1. **Frontmatter**
2. **Multiple Variants** with code examples
3. **Best Practices**
4. **Related Patterns** links

### Advanced Pages Template

Use `advanced/styling.mdx` or `advanced/events.mdx` as templates.

## 🗂️ File Structure

```
mintlify-docs/
├── docs.json                 # ✅ Site configuration
├── README.md                 # ✅ This file
├── getting-started/          # ✅ Complete (5/5)
├── frameworks/               # ✅ Complete (4/4)
├── utilities/                # ✅ Complete (9/9)
├── theming/                  # ✅ Complete (3/3)
├── components/               # 🔨 Partial (4/47)
│   ├── overview.mdx          # ✅
│   ├── button.mdx            # ✅ Example
│   ├── input.mdx             # ✅ Example
│   ├── modal.mdx             # ✅ Example
│   └── [43 more to create]   # ⏳
├── patterns/                 # 🔨 Partial (6/14)
│   └── [8 more to create]    # ⏳
├── advanced/                 # 🔨 Partial (3/6)
│   └── [3 more to create]    # ⏳
├── resources/                # ✅ Complete (3/3)
└── images/                   # ⏳ To be populated
    ├── components/
    ├── patterns/
    └── utilities/
```

## 🎨 Branding

Update these in `docs.json`:
- Logo files (currently `/logo-light.svg`, `/logo-dark.svg`)
- Favicon (`/favicon.png`)
- Analytics ID (currently placeholder)

## 🔗 Useful Links

- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify Components](https://mintlify.com/docs/components)
- [Mintlify Configuration](https://mintlify.com/docs/settings/global)
- [SGDS GitHub](https://github.com/GovTechSG/sgds-web-component)

## 📦 Deployment

Mintlify auto-deploys when changes are pushed to the connected Git repository. Configure deployment in the [Mintlify dashboard](https://dashboard.mintlify.com).

---

**Note:** All 47 components are already referenced in the `docs.json` navigation structure. Pages that don't exist yet will show 404 until created. Use the example component pages as templates to generate the remaining documentation.
