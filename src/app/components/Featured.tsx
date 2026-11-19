import { IService } from "@/types/alltype";
import { getfeaturedServices } from "../lib/api/servicesAPI";
import ServicesCard from "./ServicesCard";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

async function Featured(){
    let featured: IService[] = [];
    try {
        featured = await getfeaturedServices();
    } catch {
        featured = [];
    }

    return (
        <section id="featured" className="container mx-auto mt-14 px-2">
            <div className="mb-8 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">Featured Services</p>
                <h2 className="text-3xl font-bold text-[#2c3446] md:text-4xl">
                    Look sharp, feel amazing — <span className="text-orange-600">booked in seconds</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-gray-500">
                    Handpicked hair, skin and nail services from top-rated pros near you. Pick a service, grab a slot, show up.
                </p>
            </div>

            {featured.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {featured.map(service => <ServicesCard key={service._id} service={service} />)}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                    <p className="font-semibold text-[#2c3446]">No featured services yet</p>
                    <p className="mt-1 text-sm text-gray-500">Check back soon — new styles drop every week.</p>
                </div>
            )}

            <div className="mt-8 text-center">
                <Link
                    href={'/services'}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#2c3446] transition duration-300 hover:border-orange-600 hover:text-orange-600 hover:gap-3"
                >
                    Browse all services <FaArrowRight />
                </Link>
            </div>
        </section>
    )
}

export default Featured;
