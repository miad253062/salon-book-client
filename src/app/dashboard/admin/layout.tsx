import AdminSidebar from "@/app/components/dashboard/AdminSidebar";
import DashboardShell from "@/app/components/dashboard/DashboardShell";

function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardShell sidebar={<AdminSidebar />}>{children}</DashboardShell>;
}

export default AdminDashboardLayout;
