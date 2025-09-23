import type { Metadata } from "next";

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

export default function TryAgainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
