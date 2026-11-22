import StatCard from "@/app/components/dashboard/StatCard";
import {
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaCut,
    FaDollarSign,
    FaUsers,
} from "react-icons/fa";

function AdminOverview() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Overview</h2>
                <p className="text-sm text-gray-500">
                    Platform activity at a glance.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard label="Total Registered Customers" value={128} icon={FaUsers} tone="dark" />
                <StatCard label="Total Active Services" value={24} icon={FaCut} tone="orange" />
                <StatCard label="Total Appointment Requests" value={312} icon={FaCalendarAlt} tone="dark" />
                <StatCard label="Pending Appointments" value={46} icon={FaClock} tone="amber" />
                <StatCard label="Confirmed Appointments" value={198} icon={FaCheckCircle} tone="green" />
                <StatCard label="Total Successful Payments" value="$8,240" icon={FaDollarSign} tone="green" />
            </div>
        </div>
    );
}

export default AdminOverview;
