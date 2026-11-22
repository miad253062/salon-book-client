import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | SalonBook",
    description: "Manage your appointments, services and account.",
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export default DashboardLayout;
