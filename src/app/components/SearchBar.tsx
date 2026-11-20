"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

type SearchBarProps = {
    query?: string;
    category?: string;
    sort?: string;
};

function SearchBar({ query = "", category, sort }: SearchBarProps) {
    const router = useRouter();
    const [value, setValue] = useState(query);
    const isFirstRender = useRef(true);

    const goTo = useCallback(
        (term: string) => {
            const params = new URLSearchParams();
            const trimmed = term.trim();
            if (trimmed) params.set("q", trimmed);
            if (category) params.set("category", category);
            if (sort && sort !== "default") params.set("sort", sort);
            const qs = params.toString();
            router.replace(qs ? `/services?${qs}` : "/services");
        },
        [category, sort, router]
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (value === query) return;

        const id = setTimeout(() => goTo(value), 400);
        return () => clearTimeout(id);
    }, [value, query, goTo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        goTo(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="relative mb-6 flex w-full items-center"
        >
            <FaSearch className="pointer-events-none absolute left-4 text-gray-400" />

            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search services — haircut, facial, massage..."
                aria-label="Search services"
                className="w-full rounded-full border border-gray-200 bg-white py-3 pr-32 pl-11 text-sm text-[#2c3446] shadow-sm outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => setValue("")}
                    className="absolute right-24 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-[#2c3446]"
                >
                    <FaTimes size={13} />
                </button>
            )}

            <button
                type="submit"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;
