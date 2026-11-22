"use client";

import { FormEvent, useState } from "react";
import { FaCalendarAlt, FaClock, FaPen } from "react-icons/fa";
import { useSession } from "../lib/auth-client";
import { submitAppointmentDetails } from "../lib/api/servicesAPI";
import { IService } from "@/types/alltype";
import { toast } from "react-toastify";

export type AppointmentPayload = {
    userId: string;
    userEmail: string;
    service: IService;
    date: string;
    time: string;
    notes: string;
    status: "pending" | "confirmed" | "completed" | "canceled";
    paymentStatus: "unpaid" | "paid";
};

type AppointmentFormProps = {
    service: IService;
};

const labelClass = "mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#2c3446]";
const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#2c3446] outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100";

function AppointmentForm({ service }: AppointmentFormProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const session = useSession();

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: AppointmentPayload = {
        userId: session.data?.user?.id as string,
        userEmail: session.data?.user?.email as string,
        service,
        date,
        time,
        notes,
        status: "pending",
        paymentStatus: "unpaid"
    };

    try {
        const data = await submitAppointmentDetails(payload);

        if (data.insertedId) {
            toast.success("Appointment request submitted successfully!");
            setDate("");
            setTime("");
            setNotes("");
        } else {
            toast.error(data.message || "Failed to submit appointment request. Please try again.");
        }
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to submit appointment request. Please try again.";
        toast.error(message);
    }
};
    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-[#2c3446]">Book an Appointment</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="appt-date" className={labelClass}>
                        <FaCalendarAlt className="text-orange-600" /> Preferred Date
                    </label>
                    <input
                        id="appt-date"
                        type="date"
                        required
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="appt-time" className={labelClass}>
                        <FaClock className="text-orange-600" /> Preferred Time
                    </label>
                    <input
                        id="appt-time"
                        type="time"
                        required
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="mt-4">
                <label htmlFor="appt-notes" className={labelClass}>
                    <FaPen className="text-orange-600" /> Notes <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                    id="appt-notes"
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Anything the stylist should know?"
                    className={`${inputClass} resize-none`}
                />
            </div>

            <button

                type="submit"
                className="mt-5 w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={session.data?.user?.role !== "customer"}
            >
                Request Appointment
            </button>
        </form>
    );
}

export default AppointmentForm;
