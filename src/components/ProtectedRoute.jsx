"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading

        if (status === "unauthenticated") {
            // Redirect to login with the current page as callback
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [status, router, pathname]);

    // Show loading spinner while checking authentication
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-accent"></span>
                    <p className="mt-4 text-base-content/70">Loading...</p>
                </div>
            </div>
        );
    }

    // Show nothing while redirecting to login
    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-accent"></span>
                    <p className="mt-4 text-base-content/70">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
