"use client";

import { ReactNode, useState } from "react";
import { FaTimes } from "react-icons/fa";

type DashboardShellProps = {
    sidebar: ReactNode;
    children: ReactNode;
};

function DashboardShell({ sidebar, children }: DashboardShellProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex w-full">
            <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:block">
                {sidebar}
            </aside>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white shadow-2xl md:hidden">
                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                            <span className="text-sm font-bold text-[#2c3446]">Menu</span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close menu"
                                className="text-gray-500 transition hover:text-[#2c3446]"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        {sidebar}
                    </aside>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">

                <main className="flex-1 p-4 sm:p-6">{children}</main>
            </div>
        </div>
    );
}

export default DashboardShell;
