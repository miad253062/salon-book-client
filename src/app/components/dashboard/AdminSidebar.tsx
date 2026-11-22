import Link from "next/link";
import {
    FaChartPie,
    FaClipboardList,
    FaCut,
    FaReceipt,
    FaUsers,
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";

function AdminSidebar() {
    return (
        <nav className="flex h-full flex-col gap-1 p-4">
            <p className="mb-2 px-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                Admin Dashboard
            </p>

            <SidebarLink href="/dashboard/admin" label="Overview" icon={<FaChartPie size={16} />} />
            <SidebarLink
                href="/dashboard/admin/services"
                label="Manage Services"
                icon={<FaCut size={16} />}
            />
            <SidebarLink
                href="/dashboard/admin/appointments"
                label="Manage Appointments"
                icon={<FaClipboardList size={16} />}
            />
            <SidebarLink href="/dashboard/admin/users" label="Manage Users" icon={<FaUsers size={16} />} />
            <SidebarLink href="/dashboard/admin/transactions" label="Transactions" icon={<FaReceipt size={16} />} />

            <div className="mt-auto border-t border-gray-100 pt-4">
                <Link
                    href="/"
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#2c3446]"
                >
                    ← Back to Home
                </Link>
            </div>
        </nav>
    );
}

export default AdminSidebar;
