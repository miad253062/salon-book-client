import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

const buttonPrimary =
    "inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700";
const buttonSecondary =
    "inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2c3446] transition hover:border-orange-600 hover:text-orange-600";

function PaymentCanceledPage() {
    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <FaTimesCircle size={34} />
                </span>

                <h1 className="mt-4 text-2xl font-bold text-[#2c3446]">Payment canceled</h1>
                <p className="mt-2 text-sm text-gray-500">
                    You&apos;ve canceled the checkout — no payment was taken. Your appointment
                    request is still pending, and you can pay any time from My Appointments.
                </p>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/dashboard/customer/appointments" className={buttonPrimary}>
                        Back to My Appointments
                    </Link>
                    <Link href="/services" className={buttonSecondary}>
                        Browse Services
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentCanceledPage;
