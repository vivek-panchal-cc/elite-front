// Route configuration for the app directory
// This file defines the route types for the entire app

export const routeConfig = {
  // Public routes - accessible without authentication
  public: ["/", "/offers"],

  // Private routes - require authentication
  private: [
    "/dashboard",
    "/order",
    // "/claim",
    "/transfer",
    "/cart",
    // "/vape-products",
    // "/contact",
    "/logout",
    "/profile",
    "/reports",
    // "/change-password",
    "/report-activations",
  ],

  // Admin routes - none currently configured
  admin: ["/test-image"],

  // Shared routes - accessible for both public and private
  shared: ["/privacy-policy"],
};

// Helper function to check route type
export function getRouteType(
  pathname: string
): "public" | "private" | "admin" | "shared" {
  // Check exact matches first
  if (routeConfig.shared.includes(pathname)) return "shared";
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
