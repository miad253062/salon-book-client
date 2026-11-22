import StatCard from "@/app/components/dashboard/StatCard";
import { OverviewAdmin } from "@/app/lib/api/adminAPI";
import { TAdminOverview } from "@/types/alltype";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaCut,
    FaDollarSign,
    FaUsers,
} from "react-icons/fa";

async function AdminOverview() {
    const overviewData: TAdminOverview = await OverviewAdmin()
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Overview</h2>
                <p className="text-sm text-gray-500">
                    Platform activity at a glance.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard label="Total Registered Customers" value={overviewData.totalCustomer} icon={FaUsers} tone="dark" />
                <StatCard label="Total Active Services" value={overviewData.totalService} icon={FaCut} tone="orange" />
                <StatCard label="Total Appointment Requests" value={overviewData.totalAppointment} icon={FaCalendarAlt} tone="dark" />
                <StatCard label="Pending Appointments" value={overviewData.totalPending} icon={FaClock} tone="amber" />
                <StatCard label="Confirmed Appointments" value={overviewData.totalConfirmed} icon={FaCheckCircle} tone="green" />
                <StatCard label="Total Successful Payments" value={overviewData.payment.totalAmount} icon={FaDollarSign} tone="green" />
            </div>
        </div>
    );
}

export default AdminOverview;
