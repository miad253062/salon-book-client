"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { FaBan, FaLockOpen } from "react-icons/fa";
import { useSession } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import {
  getAllAdminUsers,
  TAdminUser,
  toggleUserBlockStatus,
} from "@/app/lib/api/AdminAPI";

const smallButton =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200";

function ManageUsers() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [users, setUsers] = useState<TAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllAdminUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBlock = async (user: TAdminUser) => {
    const targetId = user._id || user.id;
    if (!isAdmin || !targetId) return;

    const nextBlockedState = !user.isBlocked;
    setProcessingId(targetId);

    try {
      const res = await toggleUserBlockStatus(targetId, nextBlockedState);
      if (res.success || (res.modifiedCount ?? 0) > 0) {
        toast.success(
          nextBlockedState ? "User has been blocked!" : "User has been unblocked!"
        );
        setUsers((prev) =>
          prev.map((item) =>
            (item._id || item.id) === targetId
              ? { ...item, isBlocked: nextBlockedState }
              : item
          )
        );
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update user status"
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (isPending || loading) {
    return <p className="py-10 text-center text-sm text-gray-500">Loading users...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
        Access Denied: Only Admins can manage users.
      </div>
    );
  }

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
          {users.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">No users found.</p>
          ) : (
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const userId = user._id || user.id || "";
                  const isBusy = processingId === userId;
                  const statusValue = user.isBlocked ? "blocked" : "active";
                  const joinedDate = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A";

                  return (
                    <tr key={userId} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 font-semibold text-orange-600">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                          <span className="font-medium text-[#2c3446]">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{user.email}</td>
                      <td className="px-4 py-3 capitalize text-gray-500">
                        {user.role || "customer"}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{joinedDate}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={statusValue} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        {user.role === "admin" ? (
                          <span className="text-xs font-medium text-gray-400">
                            Admin
                          </span>
                        ) : !user.isBlocked ? (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleToggleBlock(user)}
                            className={`${smallButton} border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50`}
                          >
                            <FaBan size={11} /> {isBusy ? "Updating..." : "Block"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleToggleBlock(user)}
                            className={`${smallButton} border border-green-200 text-green-600 hover:bg-green-50 disabled:opacity-50`}
                          >
                            <FaLockOpen size={11} />{" "}
                            {isBusy ? "Updating..." : "Unblock"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Blocked users are not able to access protected platform features.
      </p>
    </div>
  );
}

export default ManageUsers;