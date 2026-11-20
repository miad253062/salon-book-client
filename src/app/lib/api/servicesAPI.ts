import { IService } from "@/types/alltype";

export const getfeaturedServices = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/feature`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured services');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured services:', error);
    throw error;
  }
}

export const recieveServicesByCategory = async (category: string) => {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services?category=${encodedCategory}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error('Failed to fetch services by category');
    }
    return await response.json() as IService[];
  } catch (error) {
    console.error('Error fetching services by category:', error);
    throw error;
  }
}

export const getAllServices = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    return data as IService[];
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

export const getServiceById = async (id: string): Promise<IService | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${encodeURIComponent(id)}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }
  return (await response.json()) as IService;
};