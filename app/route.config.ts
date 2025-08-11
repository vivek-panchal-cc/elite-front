// Route configuration for the app directory
// This file defines the route types for the entire app

export const routeConfig = {
  // Public routes - accessible without authentication
  public: ["/", "/vape-products", "/contact", "/offers"],

  // Private routes - require authentication
  private: [
    "/dashboard",
    "/orders",
    "/claim",
    "/transfer",
    "/cart",
    "/vape-products",
    "/contact",
    "/offers",
    "/logout",
  ],

  // Admin routes - none currently configured
  admin: ["/test-image"],
};

// Helper function to check route type
export function getRouteType(pathname: string): "public" | "private" | "admin" {
  // Check exact matches first
  if (routeConfig.public.includes(pathname)) return "public";
  if (routeConfig.private.includes(pathname)) return "private";
  if (routeConfig.admin.includes(pathname)) return "admin";

  // Check path prefixes
  if (routeConfig.private.some((route) => pathname.startsWith(route + "/")))
    return "private";
  if (routeConfig.admin.some((route) => pathname.startsWith(route + "/")))
    return "admin";

  // if (routeConfig.private.some((route) => pathname.startsWith(route)))
  //   return "private";
  // if (routeConfig.admin.some((route) => pathname.startsWith(route)))
  //   return "admin";

  // Default to public for unknown routes
  return "public";
}
