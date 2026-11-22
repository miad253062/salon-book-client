import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";
import {
    FaClock,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhone,
    FaTiktok,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
    { label: "Featured Services", href: "/#featured" },
    { label: "Sign In", href: "/sign-in" },
    { label: "Sign Up", href: "/sign-up" },
];

const socials = [
    { label: "Instagram", href: "#", icon: FaInstagram },
    { label: "Facebook", href: "#", icon: FaFacebookF },
    { label: "Twitter", href: "#", icon: FaTwitter },
    { label: "YouTube", href: "#", icon: FaYoutube },
    { label: "TikTok", href: "#", icon: FaTiktok },
];

const openingHours = [
    { days: "Mon – Fri", time: "9:00 AM – 8:00 PM" },
    { days: "Saturday", time: "9:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" },
];

const headingClass =
    "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500";

function Footer() {
    return (
        <footer className="mt-16 bg-[#2c3446] text-gray-300">
            <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link href={"/"} className="flex items-center gap-2 text-white">
                        <Image src={Logo} width={44} height={44} alt="SalonBook logo" />
                        <span className="text-xl font-bold">
                            SALON<span className="text-orange-500">BOOK</span>
                        </span>
                    </Link>
                    <p className="mt-4 text-sm leading-6 text-gray-400">
                        Discover top-rated salons, compare professional services, and book your
                        next appointment in seconds — no phone calls, no waiting.
                    </p>
                    <div className="mt-5 flex gap-2.5">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                <Icon size={14} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className={headingClass}>Important Links</h2>
                    <ul className="space-y-2.5 text-sm">
                        {navLinks.map(({ label, href }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    className="inline-block transition duration-300 hover:text-orange-500"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className={headingClass}>Contact Us</h2>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <FaPhone className="mt-0.5 text-orange-500" />
                            <a href="tel:+8801700000000" className="transition hover:text-orange-500">
                                +880 1700 000 000
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaEnvelope className="mt-0.5 text-orange-500" />
                            <a
                                href="mailto:hello@salonbook.com"
                                className="break-all transition hover:text-orange-500"
                            >
                                hello@salonbook.com
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="mt-0.5 text-orange-500" />
                            <span>
                                24 Style Avenue, Banani
                                <br />
                                Dhaka 1213, Bangladesh
                            </span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className={headingClass}>Opening Hours</h2>
                    <ul className="space-y-2.5 text-sm">
                        {openingHours.map(({ days, time }) => (
                            <li
                                key={days}
                                className="flex items-center justify-between gap-3 border-b border-white/10 pb-2"
                            >
                                <span className="text-gray-400">{days}</span>
                                <span className="text-white">{time}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <FaClock className="text-orange-500" />
                        Walk-ins welcome, appointments recommended.
                    </p>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-gray-400 sm:flex-row">
                    <p>© {new Date().getFullYear()} SalonBook. All rights reserved.</p>
                    <p>
                        Built with{" "}
                        <span className="text-orange-500">care</span> for great hair days.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
