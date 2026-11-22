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
  const res = await fetch(`${API_URL}/admin/overview`, { cache: "no-store" });
  return res.json();
};

export const getAllAdminServices = async (): Promise<TService[]> => {
  const res = await fetch(`${API_URL}/admin/services`, { cache: "no-store" });
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
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update service");
  return data;
};

export const deleteService = async (id: string) => {
  const res = await fetch(`${API_URL}/service/delete/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete service");
  return data;
};