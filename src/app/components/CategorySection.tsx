"use client";

import Link from "next/link";
import { CATEGORIES } from "@/app/data/categories";

const pillBase =
  "group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md";

function CategorySection({ active }: { active?: string }) {

  return (
    <section className="container mx-auto mt-12 px-2">
      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5 md:p-7">
        <div className="mb-5 text-center">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Find your vibe
          </p>
          <h2 className="text-2xl font-bold text-[#2c3446] md:text-3xl">
            What are you looking for?
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map(({ label, value, icon: Icon }) => {
            const isActive = active === value;

            return (
              <Link
                key={value}
                href={{ pathname: "/services", query: { category: value } }}
                className={`${pillBase} ${
                  isActive
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-gray-200 bg-white text-[#2c3446] hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition duration-300 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                  }`}
                >
                  <Icon size={13} />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
