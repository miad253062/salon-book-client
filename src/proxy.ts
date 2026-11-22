import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (session.user.isBlocked) {
        return NextResponse.redirect(new URL("/sign-in?error=blocked", request.url));
    }

    const role = session.user.role;

    if (pathname === "/dashboard") {
        const target = role === "admin" ? "/dashboard/admin" : "/dashboard/customer";
        return NextResponse.redirect(new URL(target, request.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    if (pathname.startsWith("/dashboard/customer") && role !== "customer") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/services/:id",
        "/checkout/:path*",
    ],
};