import type { Metadata } from "next";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Page not found | SalonBook",
    description: "The page you are looking for does not exist.",
};

const buttonPrimary =
    "inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700";
const buttonSecondary =
    "inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2c3446] transition hover:border-orange-600 hover:text-orange-600";

function NotFoundPage() {
    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                    <FaSearch size={30} />
                </span>

                <p className="mt-4 text-4xl font-black text-orange-600">404</p>
                <h1 className="mt-1 text-2xl font-bold text-[#2c3446]">Page not found</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been
                    moved. Let&apos;s get you back on track.
                </p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/" className={buttonPrimary}>
                        Back to Home
                    </Link>
                    <Link href="/services" className={buttonSecondary}>
                        Browse Services
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
