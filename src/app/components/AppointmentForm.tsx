"use client";

import { FormEvent, useState } from "react";
import { FaCalendarAlt, FaClock, FaPen } from "react-icons/fa";
import { useSession } from "../lib/auth-client";

export type AppointmentPayload = {
    serviceId?: string;
    serviceName: string;
    date: string;
    time: string;
    notes: string;
};

// TODO: POST the appointment request to the API once the backend endpoint is ready.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitAppointment = async (_payload: AppointmentPayload) => {
    
};

type AppointmentFormProps = {
    serviceId?: string;
    serviceName: string;
};

const labelClass = "mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#2c3446]";
const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#2c3446] outline-none transition placeholder:text-gray-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-100";

function AppointmentForm({ serviceId, serviceName }: AppointmentFormProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const session = useSession();
    console.log(session.data?.user);
    


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const payload: AppointmentPayload = {
            serviceId,
            serviceName,
            date,
            time,
            notes,
        };

        console.log("Appointment request:", payload);
        void submitAppointment(payload);
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
                className="mt-5 w-full rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-orange-700"
            >
                Request Appointment
            </button>
        </form>
    );
}

export default AppointmentForm;
