"use client";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import { FooterLayout } from "@/components/layout/FooterLayout";
import ToasterComponent from "@/components/ui/Toaster";
import { QueryProvider } from "@/components/providers/query-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { AuthProvider } from "@/lib/AuthProvider";
import { RouteLoader } from "@/components/route-loader/RouteLoader";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} font-sans antialiased`}>
        <AuthProvider>
          <QueryProvider>
            <LoaderProvider>
              <RouteLoader />
              <ToasterComponent />
              <HeaderLayout />
              {children}
              <FooterLayout />
            </LoaderProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
