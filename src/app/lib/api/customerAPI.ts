import { UserInfo } from "@/types/alltype";

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/appointment`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    const data = await response.json();
    return data as UserInfo;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
}

export const cancelAppointment = async (appointmentId: string): Promise<{ success: boolean; message?: string; modifiedCount?: number }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel appointment');
    }

    const data = await response.json();
    return data as { success: boolean; message?: string; modifiedCount?: number };
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
}

export const markAppointmentPaid = async (appointmentId?: string) => {
  if (!appointmentId) return { success: false };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${appointmentId}/payment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (response.status === 409) {
    return { success: true, alreadyPaid: true };
  }

  if (!response.ok) {
    throw new Error('Failed to update payment status');
  }

  const data = await response.json();
  return data as { success: boolean; modifiedCount?: number; alreadyPaid?: boolean };
};

export type NewTransaction = {
  transactionId?: string;
  sessionId: string;
  appointmentId?: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  service: string;
  appointmentDate?: string;
  amount: number;
  currency: string;
  status: "succeeded" | "failed" | "pending";
  date: string;
};

export type SavedTransaction = NewTransaction & {
  _id?: string;
  duplicate?: boolean;
};

export const getTransactionBySessionId = async (sessionId: string): Promise<SavedTransaction | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/session/${encodeURIComponent(sessionId)}`,
      { cache: 'no-store' }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as { transaction?: SavedTransaction | null };
    return data.transaction ?? null;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
};

export const createTransaction = async (transaction: NewTransaction) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to save transaction');
  }

  const data = await response.json();
  return data as { success: boolean; transactionId?: string; duplicate?: boolean };
};
