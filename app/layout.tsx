import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { FooterLayout } from "@/components/layout/FooterLayout";
import { QueryProvider } from "@/components/providers/query-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { AuthProvider } from "@/lib/AuthProvider";
import { RouteLoader } from "@/components/route-loader/RouteLoader";
import ToasterComponent from "@/components/ui/toaster";
import { BasketProvider } from "@/components/context/BasketContext";

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
        <AuthProvider>
          <BasketProvider>
            <QueryProvider>
              <LoaderProvider>
                <RouteLoader />
                <ToasterComponent />
                <HeaderLayout />
                {children}
                <FooterLayout />
              </LoaderProvider>
            </QueryProvider>
          </BasketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
