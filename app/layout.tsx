import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ToasterComponent from "@/components/ui/toaster";
import { QueryProvider } from "@/components/providers/query-provider";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Elite Galaxy - Premium Dashboard & Analytics",
    template: "%s | Elite Galaxy",
  },
  description:
    "Elite Galaxy provides comprehensive dashboard solutions, mortgage services, and business analytics tools for modern enterprises.",
  keywords: ["dashboard", "analytics", "mortgage", "business tools", "elite galaxy"],
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
    title: "Elite Galaxy - Premium Dashboard & Analytics",
    description:
      "Elite Galaxy provides comprehensive dashboard solutions, mortgage services, and business analytics tools for modern enterprises.",
    siteName: "Elite Galaxy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Galaxy - Premium Dashboard & Analytics",
    description:
      "Elite Galaxy provides comprehensive dashboard solutions, mortgage services, and business analytics tools for modern enterprises.",
    creator: "@elitegalaxy",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

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
            <ToasterComponent />
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
