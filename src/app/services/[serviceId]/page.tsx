import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IService } from "@/types/alltype";
import AppointmentForm from "@/app/components/AppointmentForm";
import { getServiceById } from "@/app/lib/api/servicesAPI";
import { FaArrowLeft, FaClock, FaCut, FaTag } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Service Details | SalonBook",
    description: "View service details and request an appointment.",
};

async function ServiceDetailsPage({ params }: PageProps<"/services/[serviceId]">) {
    const { serviceId } = await params;

    let service: IService | null = null;
    let failed = false;
    try {
        service = await getServiceById(serviceId);
    } catch {
        failed = true;
    }

    if (!service) {
        return (
            <div className="p-2">
                <section className="container mx-auto mt-10 px-2">
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
                        <p className="text-2xl font-bold text-[#2c3446]">
                            {failed ? "We couldn't load this service" : "Service not found"}
                        </p>
                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            {failed
                                ? "Something went wrong while fetching the service. Please try again shortly."
                                : `No service matches the ID "${serviceId}". It may have been removed, or the link is invalid.`}
                        </p>
                        <Link
                            href="/services"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2c3446] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                            <FaArrowLeft /> Browse all services
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="p-2">
            <section className="container mx-auto mt-8 px-2">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-600"
                >
                    <FaArrowLeft /> Back to services
                </Link>

                <div className="mt-4 grid gap-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                        {service.image ? (
                            <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                                <FaCut size={54} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-[#2c3446]">{service.name}</h1>

                        <span className="flex w-fit items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                            <FaTag /> {service.category}
                        </span>

                        <div className="flex flex-wrap gap-4 text-sm">
                            <p className="text-[#2c3446]">
                                <span className="text-gray-500">Price:</span>{" "}
                                <span className="font-bold text-orange-600">${service.price}</span>
                            </p>
                            <p className="text-[#2c3446] flex items-center gap-2">
                                <span className="text-gray-500">Estimated Duration:</span>{" "}
                                <span className="flex items-center gap-1.5 font-semibold">
                                    <FaClock className="text-orange-600" />
                                    {service.duration} minutes
                                </span>
                            </p>
                        </div>
                        <div>
                            <h2 className="mb-1.5 text-sm font-bold text-[#2c3446]">Description</h2>
                            <p className="text-sm leading-6 text-gray-500">{service.description}</p>
                        </div>
                        <AppointmentForm service={service} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetailsPage;
