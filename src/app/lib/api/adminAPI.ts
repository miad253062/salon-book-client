import { getAuthHeaders } from "@/app/lib/core/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type TService = {
  _id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
};

export const OverviewAdmin = async () => {
  const res = await fetch(`${API_URL}/admin/overview`, {
    cache: "no-store",
    headers: await getAuthHeaders(),
  });
  return res.json();
};

export const getAllAdminServices = async (): Promise<TService[]> => {
  const res = await fetch(`${API_URL}/admin/services`, {
    cache: "no-store",
    headers: await getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
};

export const uploadServiceImage = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is missing in environment variables.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data?.data?.url) {
    throw new Error("Image upload failed");
  }

  return data.data.url;
};

export const addService = async (payload: {
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
  addedByName?: string;
  addedByEmail?: string;
  addedByRole?: string;
}) => {
  const res = await fetch(`${API_URL}/service/add`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add service");
  return data;
};

export const updateService = async (
  id: string,
  payload: Partial<TService>
) => {
  const res = await fetch(`${API_URL}/service/update/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update service");
  return data;
};

export const deleteService = async (id: string) => {
  const res = await fetch(`${API_URL}/service/delete/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete service");
  return data;
};

export type TAdminAppointment = {
  _id: string;
  userId?: string;
  userEmail?: string;
  serviceId?: string;
  serviceName?: string;
  category?: string;
  price?: number;
  serviceImage?: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "canceled" | "completed";
  paymentStatus?: "unpaid" | "paid";
  requestDate?: string;
  message?: string;
  service?: {
    _id?: string;
    name?: string;
    category?: string;
    price?: number;
    image?: string;
  };
};

export const getAllAdminAppointments = async (): Promise<TAdminAppointment[]> => {
  const res = await fetch(`${API_URL}/admin/appointments`, {
    cache: "no-store",
    headers: await getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
};

export const confirmAppointment = async (id: string) => {
  const res = await fetch(`${API_URL}/admin/confirm_appointment/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to confirm appointment");
  return data;
};

export const cancelAdminAppointment = async (id: string) => {
  const res = await fetch(`${API_URL}/appointments/${id}/cancel`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to cancel appointment");
  return data;
};

export type TAdminUser = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role?: "customer" | "admin";
  isBlocked?: boolean;
  createdAt?: string;
  appointmentsCount?: number;
};

export const getAllAdminUsers = async (): Promise<TAdminUser[]> => {
  const res = await fetch(`${API_URL}/admin/allusers`, {
    cache: "no-store",
    headers: await getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const toggleUserBlockStatus = async (
  userid: string,
  isBlocked: boolean
) => {
  const res = await fetch(`${API_URL}/admin/users/${userid}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ isBlocked }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update user status");
  return data;
};

export type TAdminTransaction = {
  _id: string;
  transactionId?: string;
  sessionId: string;
  appointmentId?: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  service: string;
  appointmentDate: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  createdAt?: string;
};

export const getAllAdminTransactions = async (): Promise<TAdminTransaction[]> => {
  const res = await fetch(`${API_URL}/admin/transactions`, {
    cache: "no-store",
    headers: await getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};