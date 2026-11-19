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