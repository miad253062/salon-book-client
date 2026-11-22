import Link from "next/link";
import { FaCalendarCheck, FaChartPie, FaUser } from "react-icons/fa";
import SidebarLink from "./SidebarLink";

function CustomerSidebar() {
    return (
        <nav className="flex h-full flex-col gap-1 p-4">
            <p className="mb-2 px-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                Customer Dashboard
            </p>

            <SidebarLink href="/dashboard/customer" label="Overview" icon={<FaChartPie size={16} />} />
            <SidebarLink
                href="/dashboard/customer/appointments"
                label="My Appointments"
                icon={<FaCalendarCheck size={16} />}
            />
            <SidebarLink href="/dashboard/customer/profile" label="Profile" icon={<FaUser size={16} />} />

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

export default CustomerSidebar;
