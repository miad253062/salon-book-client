import type { Metadata } from "next";
import Link from "next/link";
import { IService } from "@/types/alltype";
import SearchBar from "../components/SearchBar";
import ServicesCard from "../components/ServicesCard";
import { CATEGORIES } from "@/app/data/categories";
import { getAllServices, recieveServicesByCategory } from "../lib/api/servicesAPI";
import { FaArrowDown, FaArrowUp, FaSort } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Browse Services | SalonBook",
    description: "Discover top-rated salons, compare services, and book your next appointment effortlessly.",
};

type SortValue = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: { label: string; value: SortValue; icon: typeof FaSort }[] = [
    { label: "Default", value: "default", icon: FaSort },
    { label: "Price: Low to High", value: "price-asc", icon: FaArrowUp },
    { label: "Price: High to Low", value: "price-desc", icon: FaArrowDown },
];

const chipBase =
    "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition duration-300";

const activeChip = "border-orange-600 bg-orange-600 text-white";
const idleChip =
    "border-gray-200 bg-white text-[#2c3446] hover:border-orange-600 hover:text-orange-600";

function buildHref(category?: string, sort?: SortValue, q?: string) {
    const query: Record<string, string> = {};
    if (q) query.q = q;
    if (category) query.category = category;
    if (sort && sort !== "default") query.sort = sort;
    return { pathname: "/services", query };
}

function sortServices(services: IService[], sort?: string) {
    if (sort === "price-asc") return [...services].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...services].sort((a, b) => b.price - a.price);
    return services;
}

function filterServices(services: IService[], term?: string) {
    const q = term?.trim().toLowerCase();
    if (!q) return services;
    return services.filter(service =>
        [service.name, service.description, service.category].some(text =>
            text.toLowerCase().includes(q)
        )
    );
}

async function getServicesByCategory(category?: string): Promise<IService[]> {
    if (!category) return getAllServices();
    return recieveServicesByCategory(category);
}

async function ServicesPage({ searchParams }: PageProps<"/services">) {
    const { category, sort, q } = await searchParams;
    const activeCategory = Array.isArray(category) ? category[0] : category;
    const activeSort = (Array.isArray(sort) ? sort[0] : sort) as SortValue | undefined;
    const activeQuery = Array.isArray(q) ? q[0] : q;

    let services: IService[] = [];
    let failed = false;
    try {
        services = await getServicesByCategory(activeCategory);
    } catch {
        failed = true;
    }
    services = filterServices(sortServices(services, activeSort), activeQuery);

    return (
        <div className="p-2">
            <section className="container mx-auto mt-8 px-2">
                <SearchBar query={activeQuery} category={activeCategory} sort={activeSort} />

                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                    <h1 className="text-2xl font-bold text-[#2c3446]">
                        {activeCategory ?? "All Services"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {services.length} {services.length === 1 ? "service" : "services"} available
                    </p>
                </div>

                <div className="mb-7 rounded-3xl border border-gray-100 bg-gray-50 p-5 md:p-6">
                    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                                Category-Based Filtering
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={buildHref(undefined, activeSort, activeQuery)}
                                    className={`${chipBase} ${!activeCategory ? activeChip : idleChip}`}
                                >
                                    All
                                </Link>
                                {CATEGORIES.map(({ label, value, icon: Icon }) => (
                                    <Link
                                        key={value}
                                        href={buildHref(value, activeSort, activeQuery)}
                                        className={`${chipBase} ${
                                            activeCategory === value ? activeChip : idleChip
                                        }`}
                                    >
                                        <Icon size={13} className={activeCategory === value ? "" : "text-orange-600"} />
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="md:border-l md:border-gray-200 md:pl-8">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                                Sort Services by Price
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
                                    <Link
                                        key={value}
                                        href={buildHref(activeCategory, value, activeQuery)}
                                        className={`${chipBase} ${
                                            (activeSort ?? "default") === value ? activeChip : idleChip
                                        }`}
                                    >
                                        <Icon size={13} />
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {services.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map(service => (
                            <ServicesCard key={service._id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
                        <p className="font-semibold text-[#2c3446]">
                            {failed
                                ? "Couldn't load services"
                                : activeQuery
                                    ? `No services match "${activeQuery}"`
                                    : "No services found"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {failed
                                ? "Something went wrong on our end. Please try again shortly."
                                : "Try another keyword or a different category — new styles drop every week."}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default ServicesPage;
