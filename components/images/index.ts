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
import userIcon from "./imgs/user_icon.png";
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
import transferHero from "./transfer/transfer-hero.png";
import vapeJucceAc from "./transfer/vape-jucce-ac.png";
import simplyElite from "./transfer/simply-elite-mobile.png";
import paypal from "./transfer/paypal.png";
import paypalButton from "./transfer/paypal-button.png";
import noProduct from "./products/no_product.png";
import outOfStock from "./products/out-of-stock.png";
import brandsFooter from "./imgs/dashboard_brand_footer.png";
import dashFoot1 from "./dashboard-footer/dashboard_footer_1.png";
import dashFoot2 from "./dashboard-footer/dashboard_footer_2.png";
import dashFoot3 from "./dashboard-footer/dashboard_footer_3.png";
import dashFoot4 from "./dashboard-footer/dashboard_footer_4.png";
import dashFoot5 from "./dashboard-footer/dashboard_footer_5.png";
import dashFoot6 from "./dashboard-footer/dashboard_footer_6.png";
import dashFoot7 from "./dashboard-footer/dashboard_footer_7.png";
import dashFoot8 from "./dashboard-footer/dashboard_footer_8.png";

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
  userIcon,
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
  voucher,
  transferHero,
  paypal,
  vapeJucceAc,
  simplyElite,
  paypalButton,
  noProduct,
  outOfStock,
  brandsFooter,
  dashFoot1,
  dashFoot2,
  dashFoot3,
  dashFoot4,
  dashFoot5,
  dashFoot6,
  dashFoot7,
  dashFoot8,
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
  userIcon,
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
  noProduct,
  outOfStock,
  brandsFooter,
  dashFoot1,
  dashFoot2,
  dashFoot3,
  dashFoot4,
  dashFoot5,
  dashFoot6,
  dashFoot7,
  dashFoot8,
};

// Type for the images object
export type ImageKey = keyof typeof images;
