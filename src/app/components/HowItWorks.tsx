import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaCreditCard, FaCut } from "react-icons/fa";

const steps = [
    {
        number: "01",
        icon: FaCut,
        title: "Pick your service",
        description:
            "Browse hair, skin, nail and spa treatments from top-rated salons and choose the one you want.",
    },
    {
        number: "02",
        icon: FaCalendarAlt,
        title: "Request your slot",
        description:
            "Pick a preferred date and time — the salon reviews your request and confirms the appointment.",
    },
    {
        number: "03",
        icon: FaCreditCard,
        title: "Pay & enjoy",
        description:
            "Pay securely with Stripe once you're confirmed, then show up and enjoy your appointment.",
    },
];

function HowItWorks() {
    return (
        <section className="container mx-auto mt-14 px-2">
            <div className="mb-8 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                    How it works
                </p>
                <h2 className="text-3xl font-bold text-[#2c3446] md:text-4xl">
                    Booked in <span className="text-orange-600">three simple steps</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-gray-500">
                    No phone calls, no waiting on hold — request, confirm and pay without
                    leaving the site.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {steps.map(({ number, icon: Icon, title, description }) => (
                    <article
                        key={number}
                        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-1 -top-3 text-7xl font-black text-gray-100"
                        >
                            {number}
                        </span>

                        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                            <Icon size={20} />
                        </span>

                        <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.15em] text-orange-600">
                            Step {number}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-[#2c3446]">{title}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
                    </article>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#2c3446] transition duration-300 hover:border-orange-600 hover:text-orange-600 hover:gap-3"
                >
                    Start with a service <FaArrowRight />
                </Link>
            </div>
        </section>
    );
}

export default HowItWorks;
