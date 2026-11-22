import Link from "next/link";
import type Stripe from "stripe";
import { stripe } from "@/app/lib/stripe";
import { createTransaction, getTransactionBySessionId, markAppointmentPaid } from "@/app/lib/api/customerAPI";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const buttonPrimary =
    "inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700";
const buttonSecondary =
    "inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2c3446] transition hover:border-orange-600 hover:text-orange-600";

type Message = {
    tone: "success" | "failed";
    title: string;
    description: string;
};

type CheckoutMetadata = {
    appointmentId?: string;
    userId?: string;
    serviceName?: string;
    customerName?: string;
    customerEmail?: string;
    appointmentDate?: string;
};

function getPaymentIntentId(session: Stripe.Checkout.Session): string {
    if (typeof session.payment_intent === "string") return session.payment_intent;
    return session.payment_intent?.id ?? "";
}

async function persistPayment(session: Stripe.Checkout.Session) {
    const meta = (session.metadata ?? {}) as CheckoutMetadata;
    const appointmentId = meta.appointmentId;

    if (appointmentId) {
        try {
            await markAppointmentPaid(appointmentId);
        } catch (err) {
            console.error("[payment-success] could not mark appointment paid:", err);
        }
    }

    try {
        const existing = await getTransactionBySessionId(session.id);
        if (existing) return;

        await createTransaction({
            transactionId: getPaymentIntentId(session),
            sessionId: session.id,
            appointmentId,
            customerId: meta.userId,
            customerName: meta.customerName ?? "",
            customerEmail: meta.customerEmail ?? "",
            service: meta.serviceName ?? "SalonBook service",
            appointmentDate: meta.appointmentDate ?? "",
            amount: (session.amount_total ?? 0) / 100,
            currency: session.currency ?? "usd",
            status: "succeeded",
            date: new Date().toISOString(),
        });
    } catch (err) {
        console.error("[payment-success] could not save transaction:", err);
    }
}

async function PaymentSuccessPage({ searchParams }: PageProps<"/payment-success">) {
    const { session_id } = await searchParams;
    const sessionId = Array.isArray(session_id) ? session_id[0] : session_id;

    let session: Stripe.Checkout.Session | null = null;
    if (sessionId) {
        try {
            session = await stripe.checkout.sessions.retrieve(sessionId);
        } catch (err) {
            console.error("[payment-success] unable to retrieve session:", err);
        }
    }

    let message: Message;

    if (!sessionId) {
        message = {
            tone: "failed",
            title: "Missing payment reference",
            description: "We couldn't find a payment reference for this page. If you were charged, please contact support.",
        };
    } else if (!session) {
        message = {
            tone: "failed",
            title: "We couldn't verify this payment",
            description: "The payment session could not be loaded. If you were charged, please contact support.",
        };
    } else if (session.payment_status === "paid") {
        message = {
            tone: "success",
            title: "Payment successful!",
            description: "Your payment has been verified and your appointment is now marked as paid.",
        };

        await persistPayment(session);
    } else {
        message = {
            tone: "failed",
            title: "Payment not completed",
            description: "Your payment hasn't been completed yet. You can try again from My Appointments.",
        };
    }

    const meta = (session?.metadata ?? {}) as CheckoutMetadata;
    const amount = session?.amount_total != null ? session.amount_total / 100 : null;
    const transactionId = session ? getPaymentIntentId(session) : "";
    const serviceName = meta.serviceName || "SalonBook service";
    const customerEmail = meta.customerEmail || "—";

    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <span
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                        message.tone === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                    }`}
                >
                    {message.tone === "success" ? <FaCheckCircle size={34} /> : <FaTimesCircle size={34} />}
                </span>

                <h1 className="mt-4 text-2xl font-bold text-[#2c3446]">{message.title}</h1>
                <p className="mt-2 text-sm text-gray-500">{message.description}</p>

                {message.tone === "success" && amount !== null && (
                    <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-left">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Payment receipt
                            </span>
                            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                                Paid
                            </span>
                        </div>

                        <dl className="mt-3 space-y-2.5 text-sm">
                            <div className="flex items-start justify-between gap-4">
                                <dt className="text-gray-500">Transaction ID</dt>
                                <dd className="text-right font-mono text-xs font-medium text-[#2c3446] break-all">
                                    {transactionId || session?.id || "—"}
                                </dd>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <dt className="text-gray-500">Service Name</dt>
                                <dd className="text-right font-medium text-[#2c3446]">{serviceName}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <dt className="text-gray-500">Paid Amount</dt>
                                <dd className="text-right font-bold text-orange-600">
                                    {session?.currency?.toUpperCase()} {amount.toFixed(2)}
                                </dd>
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <dt className="text-gray-500">Customer Email</dt>
                                <dd className="text-right font-medium text-[#2c3446] break-all">{customerEmail}</dd>
                            </div>
                        </dl>

                        <p className="mt-4 border-t border-gray-200 pt-3 text-center text-xs text-gray-400">
                            A copy of this transaction has been saved to your account.
                        </p>
                    </div>
                )}

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/dashboard/customer/appointments" className={buttonPrimary}>
                        View My Appointments
                    </Link>
                    <Link href="/" className={buttonSecondary}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;
