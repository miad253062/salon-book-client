import { authClient } from "@/app/lib/auth-client";

export const getAuthHeaders = async () => {
    let token: string | undefined;

    if (typeof window === "undefined") {
        const { headers } = await import("next/headers");
        const h = await headers();
        const origin =
            process.env.BETTER_AUTH_URL ||
            `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;

        const res = await fetch(`${origin}/api/auth/get-session`, {
            headers: { cookie: h.get("cookie") ?? "" },
            cache: "no-store",
        });
        const data = await res.json().catch(() => null);

        if (data?.user && data?.session?.token) {
            token = data.session.token;
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
