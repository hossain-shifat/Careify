"use client";

import Link from "next/link";
import { Home, SearchX, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* 404 Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse"></div>
                        <div className="relative bg-linear-to-br from-accent/20 to-primary/20 backdrop-blur-sm border-4 border-accent/30 rounded-full p-12 shadow-2xl">
                            <SearchX className="w-24 h-24 text-accent animate-bounce" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* 404 Text */}
                <div className="mb-6">
                    <h1 className="text-9xl md:text-[12rem] font-black mb-4 leading-none">
                        404
                    </h1>
                    <div className="h-1 w-32 mx-auto bg-linear-to-r from-transparent via-accent to-transparent rounded-full"></div>
                </div>

                {/* Error Message */}
                <div className="space-y-4 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-md mx-auto leading-relaxed">
                        The page you&apos;re looking for seems to have wandered off.
                        Don&apos;t worry, let&apos;s get you back on track!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/"
                        className="btn btn-accent text-white btn-lg shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-outline btn-lg hover:bg-base-content/10 border-2 border-base-content/20 w-full sm:w-auto group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>

                {/* Additional Help Text */}
                <div className="mt-12 pt-8 border-t border-base-content/10">
                    <p className="text-sm text-base-content/50">
                        Lost? Try visiting our{" "}
                        <Link href="/services" className="text-accent hover:underline font-semibold">
                            services page
                        </Link>
                        {" "}or{" "}
                        <Link href="/About" className="text-accent hover:underline font-semibold">
                            learn more about us
                        </Link>
                    </p>
                </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-accent/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(50px);
                        opacity: 0;
                    }
                }

                .animate-float {
                    animation: float linear infinite;
                }

                .delay-500 {
                    animation-delay: 500ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}
