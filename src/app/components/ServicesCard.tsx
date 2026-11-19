import Image from "next/image";
import Link from "next/link";
import { IService } from "@/types/alltype";
import { FaArrowRight, FaClock, FaCut, FaTag } from "react-icons/fa";

function ServicesCard({ service }: { service: IService })
{
    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {service.image ? (
                    <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-300">
                        <FaCut size={44} />
                    </div>
                )}

                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#2c3446] backdrop-blur">
                    <FaTag className="text-orange-600" /> {service.category}
                </span>

                {service.status === "active" && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-600 backdrop-blur">
                        Available
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-[#2c3446]">{service.name}</h2>
                    <span className="whitespace-nowrap text-lg font-bold text-orange-600">${service.price}</span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <FaClock /> {service.duration} min
                    </span>
                    <Link
                        href={`/services/${service._id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#2c3446] px-4 py-2 text-sm font-medium text-white transition duration-300 group-hover:bg-orange-600"
                    >
                        View Details
                        <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );

}

export default ServicesCard;
