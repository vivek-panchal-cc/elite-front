// Get browser information
export const getBrowserInfo = () => {
  if (typeof window !== "undefined") {
    const ua = window.navigator.userAgent;
    let browserName = "Unknown";
    let fullVersion = "Unknown";

    if (ua.indexOf("Firefox") > -1) {
      browserName = "Firefox";
      fullVersion = ua.substring(ua.indexOf("Firefox/") + 8);
    } else if (ua.indexOf("Chrome") > -1) {
      browserName = "Chrome";
      fullVersion = ua.substring(ua.indexOf("Chrome/") + 7);
    } else if (ua.indexOf("Safari") > -1) {
      browserName = "Safari";
      fullVersion = ua.substring(ua.indexOf("Version/") + 8);
    } else if (ua.indexOf("Edge") > -1) {
      browserName = "Edge";
      fullVersion = ua.substring(ua.indexOf("Edge/") + 5);
    }

    return { browserName, fullVersion };
  }

  // Default values for server-side rendering
  return {
    browserName: "Unknown",
    fullVersion: "Unknown",
  };
};

export const getTimeZone = () => {
  if (typeof window !== "undefined") {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return "UTC"; // Default timezone for server-side
};

// Initialize with default values
let browserName = "Unknown";
let fullVersion = "Unknown";
let timeZone = "UTC";

// Update values on client-side
if (typeof window !== "undefined") {
  const browserInfo = getBrowserInfo();
  browserName = browserInfo.browserName;
  fullVersion = browserInfo.fullVersion;
  timeZone = getTimeZone();
}

export { browserName, fullVersion, timeZone };
