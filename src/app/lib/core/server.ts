import { authClient } from "@/app/lib/auth-client";

export const getAuthHeaders = async () => {
  let token: string | undefined;

  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const { auth } = await import("@/app/lib/auth");
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user && session?.session?.token) {
      token = session.session.token;
    }
  } else {
    const { data } = await authClient.getSession();
    if (data?.user && data?.session?.token) {
      token = data.session.token;
    }
  }

  if (!token) {
    throw new Error("Unauthorized: Please sign in first.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};