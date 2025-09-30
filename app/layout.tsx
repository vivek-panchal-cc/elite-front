import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { FooterLayout } from "@/components/layout/FooterLayout";
import { QueryProvider } from "@/components/providers/query-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { AuthProvider } from "@/lib/AuthProvider";
import { RouteLoader } from "@/components/route-loader/RouteLoader";
import { BasketProvider } from "@/components/context/BasketContext";
import ToasterComponent from "@/components/ui/Toaster";
import { CheckoutProvider } from "@/components/context/CheckoutContext";
import { Suspense } from "react";
import DefaultLoader from "@/components/ui/Loader";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: {
    default: "Elite Extra Rewards - Welcome to Elite Galaxy",
    template: "%s | Elite Extra Rewards",
  },
  description:
    "Welcome to Elite Extra Rewards. Access your rewards, order vape products, top up your data, and manage your account with Elite Galaxy.",
  keywords: [
    "elite rewards",
    "vape products",
    "data top up",
    "mobile services",
    "elite galaxy",
    "rewards program",
  ],
  authors: [{ name: "Elite Galaxy Team" }],
  creator: "Elite Galaxy",
  publisher: "Elite Galaxy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elitegalaxy.com",
    title: "Elite Extra Rewards - Welcome to Elite Galaxy",
    description:
      "Welcome to Elite Extra Rewards. Access your rewards, order vape products, top up your data, and manage your account with Elite Galaxy.",
    siteName: "Elite Extra Rewards",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} font-sans antialiased`}>
        <LoaderProvider>
          <AuthProvider>
            <CheckoutProvider>
              <BasketProvider>
                <QueryProvider>
                  <RouteLoader />
                  <ToasterComponent />
                  <HeaderLayout />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen bg-black/10">
                        <div className="inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
                          <div className="flex flex-col items-center gap-6 p-8 backdrop-blur-md">
                            <div className="relative">
                              <DefaultLoader size="xl" variant="spinner" />
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    {children}
                  </Suspense>
                  <FooterLayout />
                </QueryProvider>
              </BasketProvider>
            </CheckoutProvider>
          </AuthProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
