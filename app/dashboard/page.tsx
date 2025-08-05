import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Elite Galaxy",
  description:
    "Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.",
  openGraph: {
    title: "Dashboard - Elite Galaxy",
    description:
      "Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.",
  },
};

("use client");

import { useAuth } from "@/lib/useAuth";

const Dashboard = () => {
  // This will check for token and redirect to / if not found
  useAuth();

  return <h1>Dashboard</h1>;
};

export default Dashboard;
