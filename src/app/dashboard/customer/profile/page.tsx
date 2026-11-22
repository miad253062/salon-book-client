"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { updateUser, useSession } from "../../../lib/auth-client";
import { FaLock, FaSave, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

function ProfilePage() {
  const { data, isPending, refetch } = useSession();
  const user = data?.user;

  const [draftName, setDraftName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const nameValue = draftName ?? user?.name ?? "";
  const imageValue = imageUrl || user?.image || "";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded! Save changes to apply it.");
      } else {
        toast.error("Image upload failed, please try again.");
      }
    } catch {
      toast.error("Error uploading image, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#2c3446]">You&apos;re not signed in</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to view and update your profile information.
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = nameValue.trim();
    if (!trimmed) {
      toast.error("Name can't be empty");
      return;
    }

    const nameChanged = trimmed !== user.name;
    const imageChanged = !!imageUrl && imageUrl !== user.image;
    if (!nameChanged && !imageChanged) {
      toast.info("Nothing to update");
      return;
    }

    const update: { name: string; image?: string } = { name: trimmed };
    if (imageChanged) update.image = imageUrl;

    setSaving(true);
    const { error } = await updateUser(update);
    setSaving(false);

    if (error) {
      toast.error(`Update failed: ${error.message}`);
      return;
    }

    toast.success("Profile updated!");
    await refetch();
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-bold text-[#2c3446]">My Profile</h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Update your profile information
        </p>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-orange-600 bg-gray-100">
            {imageValue ? (
              <Image src={imageValue} alt={user.name} fill sizes="96px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <FaUser size={40} />
              </div>
            )}
          </div>
          <label
            htmlFor="image"
            className="cursor-pointer rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#2c3446] transition hover:bg-gray-50"
          >
            {isUploading ? "Uploading..." : imageUrl ? "Change image" : "Choose image"}
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>
          <p className="font-semibold text-[#2c3446]">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-[#2c3446]">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={nameValue}
              onChange={e => setDraftName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-base text-[#2c3446] placeholder:text-gray-400 focus:border-orange-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-[#2c3446]">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                readOnly
                aria-disabled="true"
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 pr-10 text-base text-gray-500 cursor-not-allowed"
              />
              <FaLock
                size={13}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Email can&apos;t be changed here.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving || isUploading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2c3446] px-3 py-2.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave size={14} />
            {saving ? "Saving..." : isUploading ? "Uploading image..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
