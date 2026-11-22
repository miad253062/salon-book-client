"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type SidebarLinkProps = {
    href: string;
    label: string;
    icon: ReactNode;
};

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition duration-200 ${
                isActive
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-[#2c3446] hover:bg-orange-50 hover:text-orange-600"
            }`}
        >
            {icon}
            {label}
        </Link>
    );
}

export default SidebarLink;
