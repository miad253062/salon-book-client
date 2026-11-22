"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { CATEGORIES } from "@/app/data/categories";
import { FaImage, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import {
  addService,
  deleteService,
  getAllAdminServices,
  TService,
  updateService,
  uploadServiceImage,
} from "@/app/lib/api/adminAPI";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#2c3446] outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-1.5 block text-sm font-medium text-[#2c3446]";
const smallButton =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200";

function ManageServices() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [services, setServices] = useState<TService[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadServices = async () => {
    try {
      const data = await getAllAdminServices();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getAllAdminServices()
      .then((data) => {
        if (active) setServices(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        toast.error("Failed to load services");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setDuration("");
    setStatus("active");
    setImageFile(null);
    setExistingImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEditClick = (service: TService) => {
    setEditingId(service._id || null);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setPrice(String(service.price));
    setDuration(String(service.duration));
    setStatus(service.status);
    setExistingImage(service.image);
    setImageFile(null);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast.error("Only Admin can create or update services.");
      return;
    }

    const numericPrice = Number(price);
    const numericDuration = Number(duration);

    if (!name.trim() || !category) {
      toast.error("Service name and category are required.");
      return;
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    if (!Number.isFinite(numericDuration) || numericDuration <= 0) {
      toast.error("Duration must be a positive number.");
      return;
    }
    if (!editingId && !imageFile) {
      toast.error("Please upload a service image.");
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = existingImage;

      if (imageFile) {
        imageUrl = await uploadServiceImage(imageFile);
      }

      if (editingId) {
        await updateService(editingId, {
          name: name.trim(),
          category,
          description: description.trim(),
          price: Math.round(numericPrice),
          duration: Math.round(numericDuration),
          image: imageUrl,
          status,
        });
        toast.success("Service updated successfully!");
      } else {
        await addService({
          name: name.trim(),
          category,
          description: description.trim(),
          price: Math.round(numericPrice),
          duration: Math.round(numericDuration),
          image: imageUrl,
          status,
          addedByName: session?.user?.name,
          addedByEmail: session?.user?.email,
          addedByRole: session?.user?.role,
        });
        toast.success("New service added successfully!");
      }

      resetForm();
      await loadServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (service: TService) => {
    if (!isAdmin || !service._id) return;

    const newStatus = service.status === "active" ? "inactive" : "active";
    try {
      await updateService(service._id, { status: newStatus });
      setServices((prev) =>
        prev.map((item) =>
          item._id === service._id ? { ...item, status: newStatus } : item
        )
      );
      toast.success(`Service marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!isAdmin || !id) return;

    try {
      await deleteService(id);
      setServices((prev) => prev.filter((item) => item._id !== id));
      if (editingId === id) resetForm();
      toast.success("Service deleted successfully!");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  if (isPending) {
    return <p className="py-10 text-center text-sm text-gray-500">Checking permissions...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
        Access Denied: Only Admins can manage services.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#2c3446]">Manage Services</h2>
          <p className="text-sm text-gray-500">
            Add, update, delete or change the status of services.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            formRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          <FaPlus size={13} /> Add New Service
        </button>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <h3 className="mb-4 text-base font-bold text-[#2c3446]">
          {editingId ? "Update Service" : "Add New Service"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="svc-name" className={labelClass}>
              Service Name
            </label>
            <input
              id="svc-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Signature Haircut"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="svc-category" className={labelClass}>
              Service Category
            </label>
            <select
              id="svc-category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map(({ value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="svc-description" className={labelClass}>
              Description
            </label>
            <textarea
              id="svc-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this service includes..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="svc-price" className={labelClass}>
              Price (USD)
            </label>
            <input
              id="svc-price"
              type="number"
              min={1}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="45"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="svc-duration" className={labelClass}>
              Estimated Duration (minutes)
            </label>
            <input
              id="svc-duration"
              type="number"
              min={1}
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="45"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="svc-image" className={labelClass}>
              Service Image {editingId && "(Leave empty to keep current image)"}
            </label>
            <label
              htmlFor="svc-image"
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500 transition hover:border-orange-600 hover:text-orange-600"
            >
              <FaImage />
              <span className="truncate">
                {imageFile ? imageFile.name : "Upload image"}
              </span>
              <input
                ref={fileInputRef}
                id="svc-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label htmlFor="svc-status" className={labelClass}>
              Service Status
            </label>
            <select
              id="svc-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Default: Active — only active services appear on Browse Services.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[#2c3446] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : editingId
              ? "Update Service"
              : "Save Service"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2c3446] transition hover:border-orange-600 hover:text-orange-600"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-8 text-center text-sm text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">No services found.</p>
          ) : (
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {service.image && (
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium text-[#2c3446]">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{service.category}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600">
                      ${service.price}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{service.duration} min</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={service.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(service)}
                          className={`${smallButton} border border-gray-200 text-[#2c3446] hover:border-orange-600 hover:text-orange-600`}
                        >
                          <FaPen size={11} /> Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(service)}
                          className={`${smallButton} border border-amber-200 text-amber-600 hover:bg-amber-50`}
                        >
                          {service.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(service._id)}
                          className={`${smallButton} border border-red-200 text-red-600 hover:bg-red-50`}
                        >
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageServices;