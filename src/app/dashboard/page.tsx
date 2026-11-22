import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role === "admin") {
        redirect("/dashboard/admin");
    }

    redirect("/dashboard/customer");
}

export default DashboardPage;
