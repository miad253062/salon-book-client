import Image from "next/image"
import banner from "@/app/assets/home.png"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

function Banner () {
    return (
        <div>
            <div className="relative container mx-auto mt-10 min-h-200 border border-gray-200 rounded-3xl overflow-hidden flex items-center justify-center">
                <Image src={banner} alt="banner" fill priority sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-white/40" />
                <div className="relative z-10 w-full  space-y-4 p-8">
                    <h1 className="text-4xl font-bold md:text-6xl">Look <span className="text-orange-600">Sharp.<br/></span> Feel <span className="text-orange-600">Confident.</span><br/> Book Your <span className="text-orange-600">Style.</span></h1>
                    <p className="md:text-xl max-w-150">Discover top-rated salons, explore professional services, and book your next appointment effortlessly.</p>
                    <Link href={'#'} className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 p-2 active:scale-98 rounded-full w-54 bg-orange-600 text-white mx-auto">Explore Salon Services <FaArrowRight /></Link>
                </div>
                <Image src={banner} alt='banner' width={300} height={300} className="absolute right-1 bottom-1 rounded-2xl"/>
            </div>

        </div>
    )
}

export default Banner
