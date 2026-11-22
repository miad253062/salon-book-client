import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { mockUsers } from "@/app/data/dashboardMocks";
import { FaBan, FaLockOpen } from "react-icons/fa";

const smallButton =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200";

function ManageUsers() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Manage Users</h2>
                <p className="text-sm text-gray-500">
                    View registered customers and block or unblock their access.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[44rem] text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Joined</th>
                                <th className="px-4 py-3">Appointments</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 font-semibold text-orange-600">
                                            {user.name.charAt(0)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[#2c3446]">{user.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{user.email}</td>
                                    <td className="px-4 py-3 text-gray-500">{user.joined}</td>
                                    <td className="px-4 py-3 text-gray-500">{user.appointments}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge value={user.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {user.status === "active" ? (
                                            <button
                                                type="button"
                                                className={`${smallButton} border border-red-200 text-red-600 hover:bg-red-50`}
                                            >
                                                <FaBan size={11} /> Block
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className={`${smallButton} border border-green-200 text-green-600 hover:bg-green-50`}
                                            >
                                                <FaLockOpen size={11} /> Unblock
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-xs text-gray-400">
                Blocked users are not able to access protected platform features.
            </p>
        </div>
    );
}

export default ManageUsers;
