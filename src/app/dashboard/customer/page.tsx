import StatCard from "@/app/components/dashboard/StatCard";
import { overviewOfUser } from "@/app/lib/api/customerAPI";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { UserOverview } from "@/types/alltype";
import { FaCheckCircle, FaClock, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";

async function CustomerOverview() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const overview: UserOverview = await overviewOfUser(session?.user.email as string);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Overview</h2>
                <p className="text-sm text-gray-500">
                    A quick look at your appointment activity.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Appointment Requests" value={overview.totalAppointmentByCustomer} icon={FaCalendarAlt} tone="dark" />
                <StatCard label="Pending Appointments" value={overview.pendingAppointment} icon={FaClock} tone="amber" />
                <StatCard label="Confirmed Appointments" value={overview.confirmedAppointment} icon={FaCheckCircle} tone="green" />
                <StatCard label="Cancelled Appointments" value={overview.cancelledAppointment} icon={FaTimesCircle} tone="red" />
            </div>
        </div>
    );
}

export default CustomerOverview;
