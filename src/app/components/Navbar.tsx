"use client";

import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import Link from "next/link";
import { signOut, useSession } from "../lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

function Navbar() {
  const { data, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="container mx-auto p-2">
        <div className="flex items-center justify-between">
          <div>
            <Link className="flex items-center text-[#2c3446]" href={"/"}>
              <Image src={Logo} width={60} height={60} alt="logo" />
              <h1 className="font-bold text-2xl hidden md:block">
                SALON<span className="text-orange-600">BOOK</span>
              </h1>
            </Link>
          </div>

          <div className="text-[#2c3446] flex items-center gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/services"}>Browse Services</Link>
          </div>

          <div>
            {isPending ? (
              <span className="text-sm text-gray-500">loading...</span>
            ) : data?.user ? (
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer flex items-center gap-2 border px-2 py-1 rounded-full border-gray-200 shadow-2xs hover:bg-gray-50"
                >
                  {data.user.image ? (
                    <Image
                      src={data.user.image}
                      width={30}
                      height={30}
                      alt="profile"
                      className="h-7.5 w-7.5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gray-100 text-[#2c3446]">
                      <FaUser size={14} />
                    </div>
                  )}
                  <h1 className="text-sm font-medium text-[#2c3446]">
                    {data.user.name.split(" ")[0]}
                  </h1>
                </div>
                {open && (
                  <>
                    <div
                      onClick={() => setOpen(false)}
                      className="fixed inset-0 z-40"
                    />

                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                      <div className="border-b border-gray-100 pb-2.5">
                        <p className="truncate text-sm font-semibold text-[#2c3446]">
                          {data.user.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {data.user.email}
                        </p>
                        
                      </div>

                      <div className="mt-4 flex flex-col gap-2 text-center">
                        <Link href={'/dashboard'} className="px-2 py-1 border rounded-full border-gray-200">Go to Dashboard</Link>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-2 flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <FaSignOutAlt size={14} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-[#2c3446] flex items-center gap-4">
                <Link href={"/sign-in"}>Sign In</Link>
                <Link
                  className="px-3 py-1 rounded-2xl bg-[#2c3446] text-white"
                  href={"/sign-up"}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;