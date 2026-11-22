import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { mockTransactions } from "@/app/data/dashboardMocks";
import { FaInfoCircle } from "react-icons/fa";

function Transactions() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#2c3446]">Transactions</h2>
                <p className="text-sm text-gray-500">Read-only payment records from Stripe.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[56rem] text-left text-sm">
                        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Appointment</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Currency</th>
                                <th className="px-4 py-3">Session Reference</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockTransactions.map(transaction => (
                                <tr key={transaction.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-[#2c3446]">{transaction.customerName}</p>
                                        <p className="text-xs text-gray-500">{transaction.customerEmail}</p>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{transaction.service}</td>
                                    <td className="px-4 py-3 text-gray-500">{transaction.appointmentDate}</td>
                                    <td className="px-4 py-3 font-semibold text-orange-600">
                                        ${transaction.amount}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{transaction.currency}</td>
                                    <td className="px-4 py-3">
                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                            {transaction.sessionId}
                                        </code>
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge value={transaction.status} />
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{transaction.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-gray-400">
                <FaInfoCircle className="text-orange-600" />
                Payment records are read-only — they can&apos;t be edited to change a payment status.
            </p>
        </div>
    );
}

export default Transactions;
