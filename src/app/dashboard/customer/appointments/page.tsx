'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { FaCalendarAlt, FaClock, FaCreditCard, FaDollarSign, FaEye, FaTimes } from "react-icons/fa";
import { cancelAppointment, getUserInfo } from "@/app/lib/api/customerAPI";
import { useSession } from "@/app/lib/auth-client";
import { TAppointment } from "@/types/alltype";
import { toast } from "react-toastify";
import Link from "next/link";

const buttonBase =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition duration-200";

function MyAppointments() {
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  const [appointments, setAppointments] = useState<TAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending || !userId) return;

    let cancelled = false;

    const fetchAppointments = async () => {
      try {
        const data = await getUserInfo(userId);
        if (!cancelled) setAppointments(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) toast.error("Failed to load appointments");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAppointments();

    return () => {
      cancelled = true;
    };
  }, [userId, isPending]);

  const handleCancelAppointment = async (appointmentId?: string) => {
    if (!appointmentId) return;

    setCancelingId(appointmentId);
    try {
      const feedback = await cancelAppointment(appointmentId);

      if ((feedback.modifiedCount ?? 0) > 0 || feedback.success) {
        toast.success("Appointment canceled!");

        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId ? { ...item, status: "canceled" } : item
          )
        );
      }
    } catch {
      toast.error("Could not cancel appointment. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  const handleCheckout = async (appointment: TAppointment) => {
    const appointmentId = appointment._id;
    const amount = Math.round((appointment.service?.price ?? appointment.price ?? 0) * 100);

    if (!appointmentId) return;
    if (amount <= 0) {
      toast.error("This service has no price set.");
      return;
    }

    setPayingId(appointmentId);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          appointmentId,
          serviceName: appointment.service?.name ?? appointment.serviceName,
          userId,
          customerName: session?.user?.name,
          customerEmail: session?.user?.email,
          appointmentDate: appointment.date,
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        toast.error(data.error || "Could not start the payment.");
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error("Could not start the payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  if (isPending || (loading && !!userId)) {
    return <p className="py-10 text-center text-sm text-gray-500">Loading appointments...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2c3446]">My Appointments</h2>
        <p className="text-sm text-gray-500">
          Track, cancel or pay for your appointment requests.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          You don&apos;t have any appointments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <article
              key={appointment._id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-32">
                  {appointment.service?.image && (
                    <Image
                      src={appointment.service.image}
                      alt={appointment.service.name ?? "Service image"}
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
                        {appointment.service?.name ?? appointment.serviceName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.service?.category ?? appointment.category}
                      </p>
                    </div>
                    <StatusBadge value={appointment.status} />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
                    <div>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FaCalendarAlt /> Date
                      </p>
                      <p className="font-medium text-[#2c3446]">{appointment.date}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FaClock /> Time
                      </p>
                      <p className="font-medium text-[#2c3446]">{appointment.time}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <FaDollarSign /> Price
                      </p>
                      <p className="font-medium text-orange-600">
                        ${appointment.service?.price ?? appointment.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Payment</p>
                      <div className="mt-0.5">
                        <StatusBadge value={appointment.paymentStatus} />
                      </div>
                    </div>
                  </div>

                  {appointment.requestDate && (
                    <p className="mt-2 text-xs text-gray-400">
                      Requested on {appointment.requestDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                <Link
                  href={
                    appointment.service?._id
                      ? `/services/${appointment.service._id}`
                      : "/services"
                  }
                  type="button"
                  className={`${buttonBase} border border-gray-200 text-[#2c3446] hover:border-orange-600 hover:text-orange-600`}
                >
                  <FaEye /> View Details
                </Link>

                {appointment.status === "pending" && (
                  <button
                    type="button"
                    disabled={cancelingId === appointment._id}
                    onClick={() => handleCancelAppointment(appointment._id)}
                    className={`${buttonBase} border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50`}
                  >
                    <FaTimes />
                    {cancelingId === appointment._id ? "Canceling..." : "Cancel Request"}
                  </button>
                )}

                {appointment.status === "confirmed" && appointment.paymentStatus !== "paid" && (
                  <button
                    type="button"
                    disabled={payingId === appointment._id}
                    onClick={() => handleCheckout(appointment)}
                    className={`${buttonBase} bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50`}
                  >
                    <FaCreditCard /> {payingId === appointment._id ? "Redirecting..." : "Pay Now"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;