import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Elite Galaxy',
  description:
    'Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.',
  openGraph: {
    title: 'Dashboard - Elite Galaxy',
    description:
      'Access your Elite Galaxy dashboard with mortgage information, analytics, and exclusive offers.',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
