import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { FooterLayout } from "@/components/layout/FooterLayout";
import ToasterComponent from "@/components/ui/Toaster";
import { QueryProvider } from "@/components/providers/query-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";

const roboto = Roboto({ subsets: ["latin"] });

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
      "max-image-preview": "large",
      "max-snippet": -1,
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
  twitter: {
    card: "summary_large_image",
    title: "Elite Extra Rewards - Welcome to Elite Galaxy",
    description:
      "Welcome to Elite Extra Rewards. Access your rewards, order vape products, top up your data, and manage your account with Elite Galaxy.",
    creator: "@elitegalaxy",
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <QueryProvider>
            <LoaderProvider>
              <ToasterComponent />
              <HeaderLayout />
              {children}
              <FooterLayout />
            </LoaderProvider>
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
