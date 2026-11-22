import CustomerSidebar from "@/app/components/dashboard/CustomerSidebar";
import DashboardShell from "@/app/components/dashboard/DashboardShell";

function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardShell sidebar={<CustomerSidebar />}>{children}</DashboardShell>;
}

export default CustomerDashboardLayout;
