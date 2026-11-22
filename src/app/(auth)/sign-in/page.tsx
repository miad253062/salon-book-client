"use client";

import { signIn } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInput = Object.fromEntries(formData.entries());
    const {data, error} = await signIn.email({
      email: userInput.email as string,
      password: userInput.password as string,
    })
    if (data){
      toast.success("Sign in successful!");
      router.push("/");
    } 

    if (error) {
      toast.error(`Sign in failed: ${error.message}`);
    }
  };


  const handleGoogleSignIn = async() => {
    await signIn.social({
      provider: "google",
    })
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-[#2c3446] text-center">
          SALON<span className="text-orange-600">BOOK</span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-[#2c3446]">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-base text-[#2c3446] placeholder:text-gray-400 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#2c3446]"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 pr-10 text-base text-[#2c3446] placeholder:text-gray-400 focus:border-orange-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-[#2c3446]"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#2c3446] px-3 py-2 font-medium text-white hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs uppercase">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 justify-center w-full rounded-2xl border border-gray-200 px-3 py-2 font-medium text-[#2c3446] hover:bg-gray-50"
        >
          <FcGoogle className="text-xl"/>
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-[#2c3446]">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-orange-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
