"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { FaInfoCircle } from "react-icons/fa";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import {
  getAllAdminTransactions,
  TAdminTransaction,
} from "@/app/lib/api/AdminAPI";

function Transactions() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [transactions, setTransactions] = useState<TAdminTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllAdminTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isPending || loading) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        Loading transactions...
      </p>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
        Access Denied: Only Admins can view transactions.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2c3446]">Transactions</h2>
        <p className="text-sm text-gray-500">
          Read-only payment records from Stripe.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {transactions.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">
              No transactions found.
            </p>
          ) : (
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Appointment</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Currency</th>
                  <th className="px-4 py-3">Transaction / Session Ref</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Transaction Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction) => {
                  const formattedDate = transaction.date
                    ? new Date(transaction.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A";

                  return (
                    <tr key={transaction._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#2c3446]">
                          {transaction.customerName || "Customer"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.customerEmail || "N/A"}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {transaction.service}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {transaction.appointmentDate || "N/A"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-orange-600">
                        ${transaction.amount}
                      </td>
                      <td className="px-4 py-3 uppercase text-gray-500">
                        {transaction.currency}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {transaction.transactionId && (
                            <code
                              title={transaction.transactionId}
                              className="max-w-[14rem] truncate rounded bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
                            >
                              {transaction.transactionId}
                            </code>
                          )}
                          <code
                            title={transaction.sessionId}
                            className="max-w-[14rem] truncate rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {transaction.sessionId}
                          </code>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={transaction.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formattedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-400">
        <FaInfoCircle className="text-orange-600" />
        Payment records are read-only — they can&apos;t be edited to change a
        payment status.
      </p>
    </div>
  );
}

export default Transactions;