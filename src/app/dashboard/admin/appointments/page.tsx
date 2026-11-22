"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { FaCheck, FaEnvelope, FaEye, FaTimes, FaUser } from "react-icons/fa";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import {
  cancelAdminAppointment,
  confirmAppointment,
  getAllAdminAppointments,
  TAdminAppointment,
} from "@/app/lib/api/adminAPI";

const buttonBase =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition duration-200";

function AdminAppointments() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [appointments, setAppointments] = useState<TAdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAdminAppointments();
        setAppointments(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleConfirm = async (id: string) => {
    if (!isAdmin) return;

    setProcessingId(id);
    try {
      const res = await confirmAppointment(id);
      if ((res.modifiedCount ?? 0) > 0 || res.success) {
        toast.success("Appointment confirmed!");
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: "confirmed" } : item
          )
        );
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not confirm appointment");
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancel = async (id: string) => {
    if (!isAdmin) return;

    setProcessingId(id);
    try {
      const res = await cancelAdminAppointment(id);
      if ((res.modifiedCount ?? 0) > 0 || res.success) {
        toast.success("Appointment canceled!");
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: "canceled" } : item
          )
        );
      }
    } catch {
      toast.error("Could not cancel appointment");
    } finally {
      setProcessingId(null);
    }
  };

  if (isPending || loading) {
    return <p className="py-10 text-center text-sm text-gray-500">Loading appointments...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
        Access Denied: Only Admins can manage appointments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2c3446]">Manage Appointments</h2>
        <p className="text-sm text-gray-500">
          Review appointment requests, confirm or cancel them.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No appointments found.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => {
            const serviceName =
              appointment.service?.name ?? appointment.serviceName ?? "Service";
            const category =
              appointment.service?.category ?? appointment.category ?? "";
            const price = appointment.service?.price ?? appointment.price ?? 0;
            const image =
              appointment.service?.image ?? appointment.serviceImage ?? "";
            const serviceId = appointment.service?._id ?? appointment.serviceId;
            const isBusy = processingId === appointment._id;

            return (
              <article
                key={appointment._id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">
                    {image && (
                      <Image
                        src={image}
                        alt={serviceName}
                        fill
                        sizes="(max-width: 640px) 100vw, 128px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-[#2c3446]">
                          {serviceName}
                        </h3>
                        <p className="text-sm text-gray-500">{category}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <StatusBadge value={appointment.status} />
                        <StatusBadge value={appointment.paymentStatus} />
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                      <div className="flex items-center gap-2 text-[#2c3446]">
                        <FaUser className="text-orange-600" />
                        <span className="truncate">
                          {"Customer"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaEnvelope className="text-orange-600" />
                        <span className="truncate">
                          {appointment.userEmail || "N/A"}
                        </span>
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
                        <p className="font-semibold text-orange-600">${price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Payment</p>
                        <p className="font-medium capitalize text-[#2c3446]">
                          {appointment.paymentStatus || "unpaid"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Appointment ID</p>
                        <p className="truncate font-medium text-[#2c3446]">
                          {appointment._id}
                        </p>
                      </div>
                    </div>

                    {appointment.message && (
                      <p className="mt-3 rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-600">
                        <span className="font-medium text-[#2c3446]">
                          Customer message:
                        </span>{" "}
                        {appointment.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                  <Link
                    href={serviceId ? `/services/${serviceId}` : "/services"}
                    className={`${buttonBase} border border-gray-200 text-[#2c3446] hover:border-orange-600 hover:text-orange-600`}
                  >
                    <FaEye /> View Details
                  </Link>

                  {appointment.status === "pending" && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleConfirm(appointment._id)}
                      className={`${buttonBase} bg-green-600 text-white hover:bg-green-700 disabled:opacity-50`}
                    >
                      <FaCheck /> {isBusy ? "Processing..." : "Confirm"}
                    </button>
                  )}

                  {(appointment.status === "pending" ||
                    appointment.status === "confirmed") && (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleCancel(appointment._id)}
                      className={`${buttonBase} border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50`}
                    >
                      <FaTimes /> {isBusy ? "Processing..." : "Cancel"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminAppointments;