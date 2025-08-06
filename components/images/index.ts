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
import awardOne from "./awards/award_1.png";
import awardTwo from "./awards/award_2.png";
import awardThree from "./awards/award_3.png";
import awardFour from "./awards/award_4.png";
import awardFive from "./awards/award_5.png";
import awardSix from "./awards/award_6.png";
import googlePlay from "./imgs/google_play.png";
import appleStore from "./imgs/app_store.png";
import rightArrow from "./imgs/right_arrow.png";

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
  awardOne,
  awardTwo,
  awardThree,
  awardFour,
  awardFive,
  awardSix,
  googlePlay,
  appleStore,
  rightArrow,
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
  awardOne,
  awardTwo,
  awardThree,
  awardFour,
  awardFive,
  awardSix,
  googlePlay,
  appleStore,
  rightArrow,
};

// Type for the images object
export type ImageKey = keyof typeof images;
