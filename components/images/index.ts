// Import all images from the images directory
import elite_logo from "./elite_logo.png";
import elite_mobile_img from "./elite_mobile_img.png";
import public_background_layout from "./public_background_layout.png";
import badge_new from "./imgs/badge-new.png";
import bankStagementNew from "./imgs/bank-statement-new.png";
import commissionNew from "./imgs/commission_new.png";
import dualSim from "./imgs/dual-sim.png";
import simToolkitNew from "./imgs/sim-toolkit-new.png";
import liquidNew from "./imgs/liquid-new.png";
import publicBackground from "./public_background_layout.png";
import productOne from "./products/product_1.png";
import productTwo from "./products/product_2.png";
import productOfferOne from "./products/product_offer.png";
import broucher from "./imgs/broucher.png";
import contactUs from "./imgs/contact_us.png";
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
import burgerMenu from "./imgs/burger_menu.png";
import burgerMenuArrow from "./imgs/burger-menu-arrow.png";
import closeIcon from "./imgs/close.png";
import shoppingCart from "./imgs/shopping_cart.png";
import eliteWallet from "./imgs/elite_wallet.png";
import searchIcon from "./imgs/search_icon.png";
import dualUSB from "./imgs/dual_usb.png";
import arrowUp from "./imgs/arrow_up.png";
import arrowDown from "./imgs/arrow_down.png";
import hotFire from "./imgs/hot_fire.png";
import fire from "./svgs/Fire";
import eye from "./svgs/Eye";
import heart from "./svgs/Heart";
import addToCart from "./svgs/Cart";
import mail from "./svgs/Mail";
import phone from "./svgs/Phone";
import profile from "./svgs/Profile";
import stokeOffer from "./imgs/stoke_offer.png";
import mobile from "./products/iphone.png";
import simCard from "./products/vodafone.png";
import vapeDevice from "./products/vape.png";
import laptop from "./products/AdobeStock.png";
import voucher from "./products/amazon.png";
import vapePod from "./products/group_product.png";

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
  productTwo,
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
  burgerMenu,
  burgerMenuArrow,
  closeIcon,
  shoppingCart,
  eliteWallet,
  searchIcon,
  dualUSB,
  arrowUp,
  arrowDown,
  hotFire,
  fire,
  eye,
  heart,
  addToCart,
  mail,
  phone,
  profile,
  productOfferOne,
  stokeOffer,
  mobile,
  vapeDevice,
  vapePod,
  laptop,
  simCard,
  voucher
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
  productTwo,
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
  burgerMenu,
  burgerMenuArrow,
  closeIcon,
  shoppingCart,
  eliteWallet,
  searchIcon,
  dualUSB,
  arrowUp,
  arrowDown,
  hotFire,
  fire,
  eye,
  heart,
  addToCart,
  mail,
  phone,
  profile,
};

// Type for the images object
export type ImageKey = keyof typeof images;
