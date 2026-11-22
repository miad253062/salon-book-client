"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imgbbApiKey = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
      const res = await fetch(imgbbApiKey, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
      } else {
        console.error("Image upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: imageUrl,
    };

    const {data, error} = await signUp.email({
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      image: userData.image as string,
      role: "customer",
      isBlocked: false,
      callbackURL: "/sign-in",
    })

    if( data && error === null){
      toast.success("Sign up successful! Please sign in.");
      router.push("/sign-in");

    };

    if (error) {
      setErr(error.message as string);
    }
  };

  const handleGoogleSignIn = async() => {
    await signIn.social({
      provider: "google",
    })
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-[#2c3446] text-center">
          SALON<span className="text-orange-600">BOOK</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-[#2c3446]">
              Profile Image
            </span>
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUser size={24} />
              )}
            </div>
            <label
              htmlFor="image"
              className="cursor-pointer rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#2c3446] hover:bg-gray-50"
            >
              {isUploading
                ? "Uploading..."
                : preview
                ? "Change image"
                : "Choose image"}
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-[#2c3446]">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-base text-[#2c3446] placeholder:text-gray-400 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-[#2c3446]">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
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
                required
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
          <span className="text-sm text-red-500">{
            err && err
            }</span>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full rounded-2xl bg-[#2c3446] px-3 py-2 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? "Uploading Image..." : "Sign Up"}
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
          Already have an account?
          <Link href="/sign-in" className="font-medium text-orange-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;