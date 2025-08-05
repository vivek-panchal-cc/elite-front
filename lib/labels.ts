// Global labels file - Centralized text strings for the entire application
// This file contains all hardcoded text that can be imported and used throughout the app

export const labels = {
  // Common actions and buttons
  common: {
    login: "Log In",
    logout: "Log Out",
    signUp: "Sign Up",
    or: "OR",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    refresh: "Refresh",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    okay: "Okay",
  },

  // Login
  login: {
    forgotPassword: "Forgot your password?",
    resetPassword: "Reset your password",
    dontHaveAccount: "Don’t have an account?",
  },

  // Logout
  logout: {
    areYouSure: "Are you sure you want to ",
    logoutMessage:
      "You're about to log out of your account. Make sure to save any changes or progress before continuing.",
    logoutConfirm: "Yes, Log Me Out",
    logoutRed: "log out",
    logoutSuccessTitle: "Successfully Logged Out",
    logoutSuccessMessage: "You have successfully logged out of your account.",
  },

  //registration
  registration: {
    dealerRegistration: "Dealer Registration",
    receiveOffer:
      "I would like to receive marketing communications and exclusive offers.",
    iConfirm:
      "*I agree that I am authorised to set up an account on behalf of the company We agree to Elite Mobile's terms and conditions.",
  },

  // Navigation and menu items
  navigation: {
    offers: "Offers",
    vapeProducts: "Vape Products",
    contactUs: "Contact Us",
    home: "Home",
    about: "About Elite Galaxy",
    howItWorks: "How it Works",
    freeTrial: "Free Trial",
  },

  // Sidebar menu items
  sidebar: {
    menu: "Menu",
    myAccount: "My Account",
    dashboard: "Dashboard",
    profileInformation: "Profile Information",
    accountSettings: "Account Settings",
    billingPayments: "Billing & Payments",
    documents: "Documents",
    analytics: "Analytics",
    reports: "Reports",
    management: "Management",
    userManagement: "User Management",
    notifications: "Notifications",
    security: "Security",
  },

  // Homepage specific labels
  homepage: {
    hero: {
      title: "WELCOME TO ELITE EXTRA REWARDS",
      lostPassword: "Lost your password? Click here",
      findOutMore: "Find Out More",
      latestBrochure: "LATEST BROCHURE",
      contactUs: "CONTACT US",
      clickHere: "Click Here",
    },
    loginFeatures: {
      title: "LOG IN TO",
      seeLatestStatement: "SEE YOUR LATEST STATEMENT",
      checkClaimRewards: "CHECK AND CLAIM REWARDS",
      orderVapeProducts: "ORDER VAPE PRODUCTS",
      orderSims: "ORDER SIMS",
      claimSuperBonus: "CLAIM SUPER BONUS",
      checkSimCard: "CHECK & SIM CARD",
    },
    products: {
      vape: "Vape",
      products: "Products",
      data: "Data",
      cards: "Cards",
      topUp: "Top",
      up: "Up",
    },
    platform: {
      directTopUp: "DIRECT TOP-UP PLATFORM",
      clickForMoreInfo: "Click Here For More Information",
      downloadApp: "DOWNLOAD THE APP TODAY TO BETTER MANAGE YOUR ACCOUNT.",
      googlePlay: "Google Play",
      appStore: "App Store",
    },
  },

  // Footer specific labels
  footer: {
    sections: {
      getStarted: "Get Started",
      legals: "Legals",
      simCards: "Sim Cards",
      dealerAccounts: "Dealer Accounts",
      corporateAccounts: "Corporate Accounts",
      terms: "Terms And Conditions",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      gdpr: "GDPR Compliance",
      dealerRegistration: "Dealer Registration",
    },
    contact: {
      phone: "Call us on 0161 907 1717",
      infoEmail: "info@elitegalaxy.co.uk",
      dealerEmail: "dealer@elitegalaxy.co.uk",
      corpEmail: "corp@elitegalaxy.co.uk",
    },
    newsletter: {
      title: "Newsletter",
      description: "Get the latest updates and offers",
      placeholder: "Enter your email",
      subscribe: "Subscribe",
    },
    awards: {
      partnerOfYear: `Partner of the Year ${new Date().getFullYear()}`,
      indirectPartner: "Indirect Partner Awards",
      bestServiceProvider: "Best Service Provider",
      customerChoice: "Customer Choice Award",
      innovationExcellence: "Innovation Excellence",
      qualityAssurance: "Quality Assurance",
    },
    copyright: `Copyright © ${new Date().getFullYear()} Elite Mobile. All rights reserved.`,
  },

  // Dashboard and analytics
  dashboard: {
    analyticsOverview: "Analytics Overview",
    popularOffers: "Our Popular And Latest Offers",
    popularOffer: "Popular Offer",
    viewOffer: "View Offer",
    viewAll: "View All",
    offers: "OFFERS",
  },

  // Loader and UI components
  loader: {
    globalLoaderTest: "Global Loader Test",
    testLoaderDescription: "Click the button below to test the global loader",
    testGlobalLoader: "Test Global Loader (3s)",
    loaderVariants: "Loader Variants",
    variantsDescription: "Different loader styles available",
    loaderSizes: "Loader Sizes",
    sizesDescription: "Different sizes available",
    spinner: "Spinner",
    dots: "Dots",
    pulse: "Pulse",
    bars: "Bars",
    small: "Small",
    medium: "Medium",
    large: "Large",
    extraLarge: "Extra Large",
    // Global loader messages
    loading: "Loading...",
    pleaseWait: "Please wait while we process your request",
  },

  // Alt text for images
  altText: {
    eliteLogo: "Elite Galaxy Logo",
    eliteMobileApp: "Elite Mobile App Login Screen",
    product: "Product",
  },

  // Form labels and placeholders
  forms: {
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
  },

  // Error messages
  errors: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    passwordMismatch: "Passwords do not match",
    invalidPhone: "Please enter a valid phone number",
    networkError: "Network error. Please try again.",
    serverError: "Server error. Please try again later.",
  },

  // Success messages
  success: {
    profileUpdated: "Profile updated successfully",
    passwordChanged: "Password changed successfully",
    dataSaved: "Data saved successfully",
    emailSent: "Email sent successfully",
  },

  // Months for charts and date displays
  months: {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  },
} as const;

// Type for accessing labels with dot notation
export type Labels = typeof labels;

// Helper function to get nested labels with type safety
export function getLabel(path: string): string {
  const keys = path.split(".");
  let current: any = labels;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      console.warn(`Label path "${path}" not found`);
      return path;
    }
  }

  return typeof current === "string" ? current : path;
}

// Export individual sections for easier imports
export const commonLabels = labels.common;
export const navigationLabels = labels.navigation;
export const sidebarLabels = labels.sidebar;
export const homepageLabels = labels.homepage;
export const footerLabels = labels.footer;
export const dashboardLabels = labels.dashboard;
export const loaderLabels = labels.loader;
export const altTextLabels = labels.altText;
export const formLabels = labels.forms;
export const errorLabels = labels.errors;
export const successLabels = labels.success;
export const monthLabels = labels.months;
export const loginLabels = labels.login;
export const logoutLabels = labels.logout;
export const registrationLabels = labels.registration;
