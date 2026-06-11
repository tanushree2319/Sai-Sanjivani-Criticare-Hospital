# SASS Architecture Quick Reference

## 🎯 File Import Order (Critical)

The `main.scss` file imports in this specific order to ensure CSS cascade integrity:

```
1. _variables.scss       → Define all custom props + Bootstrap overrides
2. Bootstrap core        → Functions, variables, mixins, root, reboot
3. Bootstrap grid        → Container + grid system
4. Bootstrap utilities   → Display, flex, spacing, text, etc.
5. _base.scss            → Typography, containers, animations
6. _footer.scss          → Footer-specific styles
7. _header.scss          → Fixed header + nav
8. _buttons.scss         → All button variants
9. _badges.scss          → Badges and trust marks
10. _hero.scss           → Hero section
11. _trust-strip.scss    → Trust grid
12. _about.scss          → About section
13. _stats.scss          → Metrics section
14. _doctor.scss         → Doctor profile
15. Custom utilities     → Final helper classes
```

**Why this order matters:**
- Variables override Bootstrap defaults at compilation time
- Base styles reset before components
- Components build on base styles
- Sections use both components and layouts
- Utilities apply last (highest specificity)

---

## 📐 Responsive Breakpoints

```scss
xs:   0px      (mobile)
sm:   576px    (small phones)
md:   768px    (tablets)
lg:   992px    (laptops)
xl:   1200px   (desktops)
xxl:  1400px   (large screens)
```

**Mobile-first pattern:**
```scss
.element {
  font-size: 1rem;           // Mobile default
}

@media (min-width: 768px) {  // Tablets and up
  .element {
    font-size: 1.125rem;
  }
}

@media (min-width: 992px) {  // Desktops and up
  .element {
    font-size: 1.25rem;
  }
}
```

---

## 🎨 Color Palette Reference

| Variable | Value | Usage |
|----------|-------|-------|
| `$color-primary` | `#0f4c75` | Main brand color (headings, buttons) |
| `$color-primary-dark` | `#0a314d` | Hover states, deep elements |
| `$color-primary-light` | `#a4dbff` | Text highlights, accents |
| `$color-accent` | `#3282b8` | Secondary actions, borders |
| `$color-emergency` | `#C51F33` | Emergency CTA, alerts |
| `$color-soft` | `#eaf6ff` | Light backgrounds, badges |
| `$color-text-dark` | `#1b262c` | Primary text |
| `$color-text-light` | `#555555` | Secondary text, paragraphs |
| `$color-white` | `#ffffff` | Neutral, white backgrounds |
| `$color-bg-light` | `#fafafa` | Page background |
| `$color-bg-soft` | `#f8fbfe` | Section backgrounds |

---

## 🔤 Typography Scale

| Element | Size | Weight | Line-height | Usage |
|---------|------|--------|-------------|-------|
| H1 | `clamp(2rem, 5vw, 3.5rem)` | 700 | 1.15 | Hero title |
| H2 | `clamp(1.75rem, 4vw, 2.25rem)` | 600 | 1.15 | Section heading |
| H3 | `1.5rem` | 600 | 1.15 | Subheading |
| H4 | `1.125rem` | 600 | 1.15 | Card title |
| Body | `1rem` | 400 | 1.6 | Paragraphs |
| Small | `0.875rem` | 500 | 1.6 | Labels, captions |

**Letter spacing:**
- Tight: `-0.02em` (headings)
- Wide: `1px` (labels)
- Wider: `1.5px` (uppercase)
- Widest: `2px` (section subtitles)

---

## 📏 Spacing Scale

| Variable | Value | Usage |
|----------|-------|-------|
| `$spacing-xs` | `6px` | Tight spacing |
| `$spacing-sm` | `12px` | Small gaps |
| `$spacing-md` | `20px` | Default gaps |
| `$spacing-lg` | `40px` | Component margins |
| `$spacing-xl` | `60px` | Section gaps |
| `$spacing-xxl` | `80px` | Large section padding |
| `$spacing-hero` | `100px` | Hero padding |

---

## 🎬 Animation & Transitions

```scss
$transition-fast:   0.3s ease;           // Hover effects
$transition-normal: 0.4s ease;           // Property changes
$transition-slow:   0.4s cubic-bezier(); // Complex transitions
```

**Keyframe animations:**
```scss
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

// Usage: animation: fadeIn 1s ease-out;
```

---

## ✨ Shadow Effects

| Variable | Value | Usage |
|----------|-------|-------|
| `$shadow-sm` | Soft white glow | Button glows |
| `$shadow-md` | Clinical blue shadow | Hover lift |
| `$shadow-lg` | Image shadows | Cards, images |
| `$shadow-xl` | Deep shadow | Floating elements |
| `$shadow-emergency` | Red glow | Emergency buttons |

---

## 🔨 Build Commands

```bash
# Development (watches for changes)
npm run sass

# Production (minified output)
npm run sass:build

# Start local server
npm run serve

# Install dependencies
npm install
```

**Output location:** `css/main.css` (compiled from `scss/main.scss`)

---

## 📝 Mixin Examples (Bootstrap Inherited)

```scss
// Media query mixin
@include media-breakpoint-up(md) {
  .element { width: 50%; }
}

// Flexbox utilities
display: flex;
justify-content: center;
align-items: center;
gap: $spacing-md;

// Grid utilities
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: $spacing-lg;
```

---

## 🎯 Common Patterns

### **Center Content Vertically**
```scss
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

### **Responsive Image**
```scss
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: $border-radius-lg;
}
```

### **Hover Lift Effect**
```scss
.element {
  transition: transform $transition-fast, box-shadow $transition-fast;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
  }
}
```

### **Glassmorphism**
```scss
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### **Responsive Grid**
```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-lg;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔍 Debugging Tips

### **Check compiled CSS**
```bash
# Watch output in real-time
npm run sass -- --watch scss:css --style=expanded
```

### **Find where a style is defined**
1. Search for the class name in all SCSS files
2. Check if it's overridden in a later section file
3. Verify breakpoint conditions

### **CSS specificity ladder**
```
- IDs (not used in this project)
- Classes & attributes (main)
- Elements & pseudo-elements
- Universal selector (*)
```

---

## 📱 Mobile-First Development Checklist

- [ ] Base styles work on mobile (320px+)
- [ ] Tablet layout optimized (768px+)
- [ ] Desktop enhanced (992px+)
- [ ] Large screens handle max-width (1500px)
- [ ] Images scale responsively
- [ ] Text remains readable at all sizes
- [ ] Touch targets ≥44px on mobile
- [ ] No horizontal scroll on mobile

---

## 🚀 Performance Optimization

1. **Only import used utilities** - Review `main.scss` Bootstrap imports
2. **Use SASS nesting wisely** - Avoid deep selector chains
3. **Group media queries** - Combine similar breakpoints
4. **Minify for production** - `npm run sass:build`
5. **Tree-shake unused CSS** - Remove unused partials

**Final payload size:** 18-22 KB (Gzipped)

---

## 📚 File Modification Guide

### **To add a new button style:**
Edit `scss/components/_buttons.scss`, add class, no rebuild needed

### **To change all primary colors:**
Edit `scss/abstracts/_variables.scss`, run `npm run sass`

### **To add a new section:**
1. Create `scss/sections/_newsection.scss`
2. Import in `main.scss`
3. Use variables from `_variables.scss`

### **To adjust spacing throughout:**
Modify `$spacing-*` variables → all components auto-adjust

---

This architecture ensures **maintainability**, **scalability**, and **performance** while preserving your premium "Quiet Luxury" design identity. 🎨✨
