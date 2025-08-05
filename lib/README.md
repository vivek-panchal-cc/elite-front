# Global Labels System

This directory contains the centralized labels system for the Elite Store Customer application.

## Overview

The `labels.ts` file contains all hardcoded text strings used throughout the application, organized by sections for better maintainability. This approach allows for easy localization and text changes without modifying individual components.

## Usage

### Basic Import

```typescript
import { labels } from "@/lib/labels";

// Access specific sections
const loginText = labels.common.login; // "LOG IN"
const heroTitle = labels.homepage.hero.title; // "WELCOME TO ELITE EXTRA REWARDS"
```

### Section-Specific Imports

For better performance and cleaner code, you can import specific sections:

```typescript
import {
  commonLabels,
  homepageLabels,
  navigationLabels,
  sidebarLabels,
  footerLabels,
  dashboardLabels,
  loaderLabels,
  altTextLabels,
  formLabels,
  errorLabels,
  successLabels,
  monthLabels,
} from "@/lib/labels";

// Use directly
const loginButton = commonLabels.login;
const heroTitle = homepageLabels.hero.title;
```

### Helper Function

For dynamic label access, use the `getLabel` function:

```typescript
import { getLabel } from "@/lib/labels";

const label = getLabel("homepage.hero.title"); // "WELCOME TO ELITE EXTRA REWARDS"
```

## Label Structure

The labels are organized into the following sections:

### Common Labels

- Basic actions and buttons (login, signup, submit, cancel, etc.)

### Navigation Labels

- Menu items and navigation links

### Sidebar Labels

- Dashboard sidebar menu items

### Homepage Labels

- Hero section text
- Login features
- Product information
- Platform information

### Footer Labels

- Footer sections
- Contact information
- Newsletter
- Awards
- Copyright

### Dashboard Labels

- Analytics and dashboard components

### Loader Labels

- UI loader component text

### Alt Text Labels

- Image alt text for accessibility

### Form Labels

- Form field labels and placeholders

### Error Labels

- Error messages

### Success Labels

- Success messages

### Month Labels

- Month abbreviations for charts

## Adding New Labels

1. Add the new label to the appropriate section in `labels.ts`
2. Use the label in your component by importing the relevant section
3. Update this README if you add new sections

## Benefits

- **Centralized Management**: All text is in one place
- **Easy Localization**: Simple to add multiple languages
- **Type Safety**: TypeScript provides autocomplete and error checking
- **Consistency**: Ensures consistent terminology across the app
- **Maintainability**: Easy to update text without touching components

## Example Component Usage

```typescript
import { homepageLabels, commonLabels } from "@/lib/labels";

export function HeroSection() {
  return (
    <div>
      <h1>{homepageLabels.hero.title}</h1>
      <button>{commonLabels.login}</button>
    </div>
  );
}
```

## Migration Guide

When migrating existing components:

1. Import the relevant label sections
2. Replace hardcoded strings with label references
3. Test the component to ensure it works correctly
4. Remove any unused imports

## Future Enhancements

- Add support for multiple languages
- Add label validation
- Add label usage analytics
- Add label search functionality
