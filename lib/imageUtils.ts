import { images, ImageKey } from "@/components/images";

/**
 * Get an image by its key
 * @param key - The image key
 * @returns The image import or undefined if not found
 */
export function getImage(key: ImageKey) {
  return images[key];
}

/**
 * Get all available image keys
 * @returns Array of all image keys
 */
export function getImageKeys(): ImageKey[] {
  return Object.keys(images) as ImageKey[];
}

/**
 * Check if an image key exists
 * @param key - The image key to check
 * @returns True if the image exists, false otherwise
 */
export function hasImage(key: string): key is ImageKey {
  return key in images;
}

/**
 * Get all images as an object
 * @returns All images object
 */
export function getAllImages() {
  return images;
} 