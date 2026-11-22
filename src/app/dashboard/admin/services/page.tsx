import Image from "next/image";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { CATEGORIES } from "@/app/data/categories";
import { mockServices } from "@/app/data/dashboardMocks";
import { FaImage, FaPen, FaPlus, FaTrash } from "react-icons/fa";

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#2c3446] outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-1.5 block text-sm font-medium text-[#2c3446]";
const smallButton =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200";

function ManageServices() {
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
                    className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                    <FaPlus size={13} /> Add New Service
                </button>
            </div>

            <form className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-[#2c3446]">Add / Update Service</h3>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="svc-name" className={labelClass}>
                            Service Name
                        </label>
                        <input id="svc-name" type="text" placeholder="Signature Haircut" className={inputClass} />
                    </div>

                    <div>
                        <label htmlFor="svc-category" className={labelClass}>
                            Service Category
                        </label>
                        <select id="svc-category" className={inputClass} defaultValue="">
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
                            placeholder="45"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="svc-image" className={labelClass}>
                            Service Image
                        </label>
                        <label
                            htmlFor="svc-image"
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500 transition hover:border-orange-600 hover:text-orange-600"
                        >
                            <FaImage /> Upload image
                            <input id="svc-image" type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="svc-status" className={labelClass}>
                            Service Status
                        </label>
                        <select id="svc-status" className={inputClass} defaultValue="active">
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
                        type="button"
                        className="rounded-full bg-[#2c3446] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        Save Service
                    </button>
                    <button
                        type="button"
                        className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2c3446] transition hover:border-orange-600 hover:text-orange-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
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
                            {mockServices.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                <Image
                                                    src={service.image}
                                                    alt={service.name}
                                                    fill
                                                    sizes="40px"
                                                    className="object-cover"
                                                />
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
                                                className={`${smallButton} border border-gray-200 text-[#2c3446] hover:border-orange-600 hover:text-orange-600`}
                                            >
                                                <FaPen size={11} /> Update
                                            </button>
                                            <button
                                                type="button"
                                                className={`${smallButton} border border-amber-200 text-amber-600 hover:bg-amber-50`}
                                            >
                                                {service.status === "active" ? "Deactivate" : "Activate"}
                                            </button>
                                            <button
                                                type="button"
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
                </div>
            </div>
        </div>
    );
}

export default ManageServices;
