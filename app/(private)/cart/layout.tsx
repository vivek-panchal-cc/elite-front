import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Elite Galaxy",
  description:
    "Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.",
  openGraph: {
    title: "Elite Galaxy",
    description:
      "Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={roboto.className}>
      {children}
    </div>
  );
}
