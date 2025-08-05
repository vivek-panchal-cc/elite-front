// Import all images from the images directory
import elite_logo from "./elite_logo.png";
import elite_mobile_img from "./elite_mobile_img.png";
import public_background_layout from "./public_background_layout.png";
import badge_new from "./badge-new.svg";
import bankStagementNew from "./bank-statement-new.svg";
import commissionNew from "./commission-new.svg";
import dualSim from "./dual-sim.svg";
import simToolkitNew from "./sim-toolkit-new.svg";
import liquidNew from "./liquid-new.svg";
import publicBackground from "./public_background_layout.png";
import productOne from "./products/product_1.png";
import broucher from "./broucher.svg";
import contactUs from "./contact_us.svg";
import simply from "./products/simply-blue.png";
import rightTick from "./RightTick.svg";

// Export all images as a single object
export const images = {
  elite_logo,
  elite_mobile_img,
  public_background_layout,
  badge_new,
  bankStagementNew,
  commissionNew,
  dualSim,
  simToolkitNew,
  liquidNew,
  publicBackground,
  productOne,
  broucher,
  contactUs,
  simply,
  rightTick,
} as const;

// Export individual images for direct import
export {
  elite_logo,
  elite_mobile_img,
  public_background_layout,
  badge_new,
  bankStagementNew,
  commissionNew,
  dualSim,
  simToolkitNew,
  liquidNew,
  publicBackground,
  productOne,
  broucher,
  contactUs,
  simply,
  rightTick,
};

// Type for the images object
export type ImageKey = keyof typeof images;
