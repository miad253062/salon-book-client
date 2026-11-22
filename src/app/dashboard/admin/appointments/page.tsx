import Image from "next/image";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { mockAppointments } from "@/app/data/dashboardMocks";
import { FaCheck, FaEnvelope, FaEye, FaTimes, FaUser } from "react-icons/fa";

const buttonBase =
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition duration-200";

function AdminAppointments() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Manage Appointments</h2>
                <p className="text-sm text-gray-500">
                    Review appointment requests, confirm or cancel them.
                </p>
            </div>

            <div className="space-y-4">
                {mockAppointments.map(appointment => (
                    <article
                        key={appointment.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">
                                <Image
                                    src={appointment.serviceImage}
                                    alt={appointment.serviceName}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 128px"
                                    className="object-cover"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3 className="truncate font-semibold text-[#2c3446]">
                                            {appointment.serviceName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{appointment.category}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        <StatusBadge value={appointment.status} />
                                        <StatusBadge value={appointment.paymentStatus} />
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                                    <div className="flex items-center gap-2 text-[#2c3446]">
                                        <FaUser className="text-orange-600" />
                                        <span className="truncate">{appointment.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <FaEnvelope className="text-orange-600" />
                                        <span className="truncate">{appointment.customerEmail}</span>
                                    </div>
                                    <div className="text-gray-500">
                                        <span className="font-medium text-[#2c3446]">
                                            {appointment.date} · {appointment.time}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                                    <div>
                                        <p className="text-xs text-gray-400">Service Price</p>
                                        <p className="font-semibold text-orange-600">${appointment.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Payment</p>
                                        <p className="font-medium capitalize text-[#2c3446]">
                                            {appointment.paymentStatus}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Requested</p>
                                        <p className="font-medium text-[#2c3446]">{appointment.requestDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Appointment ID</p>
                                        <p className="font-medium text-[#2c3446]">{appointment.id}</p>
                                    </div>
                                </div>

                                {appointment.message && (
                                    <p className="mt-3 rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-600">
                                        <span className="font-medium text-[#2c3446]">Customer message:</span>{" "}
                                        {appointment.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                            <button
                                type="button"
                                className={`${buttonBase} border border-gray-200 text-[#2c3446] hover:border-orange-600 hover:text-orange-600`}
                            >
                                <FaEye /> View Details
                            </button>

                            {appointment.status === "pending" && (
                                <button
                                    type="button"
                                    className={`${buttonBase} bg-green-600 text-white hover:bg-green-700`}
                                >
                                    <FaCheck /> Confirm
                                </button>
                            )}

                            {(appointment.status === "pending" || appointment.status === "confirmed") && (
                                <button
                                    type="button"
                                    className={`${buttonBase} border border-red-200 text-red-600 hover:bg-red-50`}
                                >
                                    <FaTimes /> Cancel
                                </button>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default AdminAppointments;
