import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - Elite Galaxy",
  description: "",
  openGraph: {
    title: "Change Password - Elite Galaxy",
    description: "",
  },
};

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
