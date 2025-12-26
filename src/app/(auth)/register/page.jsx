"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, IdCard, Phone, Lock, EyeClosed } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get("callbackUrl") || "/";
    const callbackUrl = "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const password = watch("password");

    const onSubmit = async (data) => {
        setError("");
        setLoading(true);

        try {
            // Register user
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    nidNo: data.nidNo,
                    contact: data.contact,
                    password: data.password,
                }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                setError(responseData.error || "Registration failed");
                setLoading(false);
                return;
            }

            // Auto login after registration
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setError("Registration successful but login failed. Please login manually.");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", { callbackUrl });
        } catch (error) {
            setError("Google sign in failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold mb-2">
                        Create your account
                    </h2>
                    <p className="text-base-content/70">
                        Join Careify to book trusted care services
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-base-200 rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <div className="bg-error/10 border border-error/20 text-error rounded-lg px-4 py-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-base-content">
                                    Full Name <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input id="name" type="text" {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })} className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.name ? "border-error" : "border-base-300"}`} placeholder="Enter your full name" />
                                </div>
                                {errors.name && (
                                    <p className="text-error text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-base-content">
                                    Email Address <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.email ? "border-error" : "border-base-300"
                                            }`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-error text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="nidNo" className="block text-sm font-medium text-base-content">
                                    NID Number <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="nidNo"
                                        type="text"
                                        {...register("nidNo", {
                                            required: "NID number is required",
                                            minLength: { value: 10, message: "NID must be at least 10 digits" }
                                        })}
                                        className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.nidNo ? "border-error" : "border-base-300"
                                            }`}
                                        placeholder="Enter your NID number"
                                    />
                                </div>
                                {errors.nidNo && (
                                    <p className="text-error text-sm">{errors.nidNo.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contact" className="block text-sm font-medium text-base-content">
                                    Contact Number <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="contact"
                                        type="tel"
                                        {...register("contact", {
                                            required: "Contact number is required",
                                            pattern: {
                                                value: /^[0-9+\-\s()]+$/,
                                                message: "Invalid phone number"
                                            }
                                        })}
                                        className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.contact ? "border-error" : "border-base-300"
                                            }`}
                                        placeholder="Enter your contact number"
                                    />
                                </div>
                                {errors.contact && (
                                    <p className="text-error text-sm">{errors.contact.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-base-content">
                                    Password <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input id="password" type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, message: "Password must be 6+ chars with 1 uppercase and 1 lowercase" } })} className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.password ? "border-error" : "border-base-300"}`} placeholder="Enter your password" />
                                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 mt-3 cursor-pointer">{showPassword ? <EyeClosed /> : <Eye />}</span>
                                </div>
                                {errors.password && (
                                    <p className="text-error text-sm">{errors.password.message}</p>
                                )}
                                {!errors.password && (
                                    <p className="text-xs text-base-content/60">
                                        At least 6 characters, 1 uppercase, 1 lowercase
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-base-content">
                                    Confirm Password <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })}className={`w-full p-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.confirmPassword ? "border-error" : "border-base-300" }`} placeholder="Confirm your password"/>
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 mt-3 cursor-pointer">{showConfirmPassword ? <EyeClosed /> : <Eye />}</span>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-error text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-base-200 text-base-content/60">OR</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full bg-base-100 hover:bg-base-300 border border-base-300 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                        <p className="text-center text-sm text-base-content/70">
                            Already have an account?{" "}
                            <Link href="/login" className="text-accent font-medium hover:underline">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
