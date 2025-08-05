# Image Management System

This directory contains all images used in the application, along with a centralized management system.

## How to Add New Images

1. **Add your image file** to the `components/images/` directory
2. **Update the index file** by adding the import and export in `components/images/index.ts`:

```typescript
// Add import
import your_new_image from "./your_new_image.png";

// Add to images object
export const images = {
  elite_logo,
  elite_mobile_img,
  your_new_image, // Add here
} as const;

// Add to individual exports
export { elite_logo, elite_mobile_img, your_new_image };
```

## How to Use Images

### Method 1: Using the images object (Recommended)

```typescript
import { images } from "@/components/images";

// In your component
<Image src={images.elite_logo} alt="Logo" />;
```

### Method 2: Using utility functions

```typescript
import { getImage } from "@/lib/image-utils";

// In your component
<Image src={getImage("elite_logo")} alt="Logo" />;
```

### Method 3: Direct import (Legacy - not recommended for new code)

```typescript
import { elite_logo } from "@/components/images";

// In your component
<Image src={elite_logo} alt="Logo" />;
```

## Benefits of This Approach

1. **Centralized Management**: All images are managed in one place
2. **Type Safety**: TypeScript will catch typos in image keys
3. **Easy Refactoring**: Change image names in one place
4. **Better IDE Support**: Autocomplete for image names
5. **Scalable**: Easy to add new images without updating multiple files

## Available Images

- `elite_logo` - Main logo image
- `elite_mobile_img` - Mobile-specific image

## Utility Functions

The `lib/image-utils.ts` file provides helpful functions:

- `getImage(key)` - Get an image by its key
- `getImageKeys()` - Get all available image keys
- `hasImage(key)` - Check if an image key exists
- `getAllImages()` - Get all images as an object
