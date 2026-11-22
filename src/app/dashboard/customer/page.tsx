import StatCard from "@/app/components/dashboard/StatCard";
import { getUserInfo } from "@/app/lib/api/customerAPI";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { UserInfo } from "@/types/alltype";
import { FaCheckCircle, FaClock, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";



const overview = (data: UserInfo) => {
    const totalAppointments = data.length;
    const pendingAppointments = data.filter((appointment) => appointment.status === "pending").length;
    const confirmedAppointments = data.filter((appointment) => appointment.status === "confirmed").length;
    const cancelledAppointments = data.filter((appointment) => appointment.status === "cancelled").length;

    return {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        cancelledAppointments,
    };
}


async function CustomerOverview() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;
    const data = await getUserInfo(userId as string)
    const {totalAppointments, pendingAppointments, confirmedAppointments, cancelledAppointments} = overview(data);

    console.log("User Info in CustomerOverview:", data)
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Overview</h2>
                <p className="text-sm text-gray-500">
                    A quick look at your appointment activity.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total Appointment Requests" value={totalAppointments} icon={FaCalendarAlt} tone="dark" />
                <StatCard label="Pending Appointments" value={pendingAppointments} icon={FaClock} tone="amber" />
                <StatCard label="Confirmed Appointments" value={confirmedAppointments} icon={FaCheckCircle} tone="green" />
                <StatCard label="Cancelled Appointments" value={cancelledAppointments} icon={FaTimesCircle} tone="red" />
            </div>
        </div>
    );
}

export default CustomerOverview;
