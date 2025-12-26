"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { Eye, Edit2, X, MapPin, Clock, Package, ChevronRight, Home } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyBookingsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingBooking, setEditingBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        if (session?.user?.id) {
            fetchBookings()
        }
    }, [session])

    const fetchBookings = async () => {
        try {
            const response = await fetch(`/api/bookings?userId=${session.user.id}`);
            if (!response.ok) throw new Error("Failed to fetch bookings");

            const data = await response.json();
            setBookings(data.bookings || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Cancelled" }),
            });

            if (!response.ok) throw new Error("Failed to cancel booking");
            fetchBookings();
        } catch (err) {
            toast.success("Failed to cancel booking: " + err.message);
        }
    };

    const handleUpdateStatus = async (bookingId) => {
        console.log(bookingId)
        // if (!bookingId) return toast.success("Invalid booking ID");
        // if (!newStatus) return toast.success("Please select a status");

        try {
            const response = await axios.patch(`/api/bookings/${bookingId}`, {
                status: newStatus
            });

            // Check if backend returned success
            if (response.status === 200) {
                fetchBookings();
                setEditingBooking(null);
                setNewStatus("");
            } else {
                toast.success("Failed to update status");
            }
        } catch (err) {
            // Axios error handling
            const message = err.response?.data?.error || err.message;
            toast.success("Failed to update status: " + message);
            console.error("Update status error:", err);
        }
    }

    const getStatusBadge = (status) => {
        const styles = {
            Pending: "text-warning",
            Confirmed: "text-info",
            Completed: "text-success",
            Cancelled: "text-error"
        };
        return `px-4 py-2 rounded-full text-sm font-bold ${styles[status] || "bg-base-300 text-base-content border-base-300"}`;
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-200 via-base-100 to-base-200">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-accent mb-4"></div>
                        <p className="text-base-content/70 font-medium text-lg">Loading your bookings...</p>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200">
                {/* Header Section */}
                <div className="text-white shadow-2xl">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex items-center gap-2 text-sm mb-4 text-white/80">
                            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="font-semibold text-white">My Bookings</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">My Bookings</h1>
                                <p className="text-white/90 text-lg">Manage and track all your service bookings</p>
                            </div>
                            <Link href="/services" className="btn btn-white bg-white text-accent hover:bg-white/90 btn-lg shadow-lg">
                                <Package className="w-5 h-5" />
                                Browse Services
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {error ? (
                        <div className="bg-error/10 border-2 border-error/30 text-error rounded-2xl px-6 py-4 flex items-center gap-3 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">{error}</span>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border-2 border-base-300">
                            <div className="bg-accent/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package className="w-16 h-16 text-accent" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3 text-base-content">No Bookings Yet</h3>
                            <p className="text-base-content/60 mb-8 text-lg max-w-md mx-auto">
                                You haven&apos;t made any bookings yet. Start exploring our services and book your first one!
                            </p>
                            <Link href="/services" className="btn btn-accent text-white btn-lg shadow-xl hover:shadow-2xl">
                                <Package className="w-5 h-5" />
                                Explore Services
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 ">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Total", count: bookings.length, color: "bg-accent/10 border-accent/30 text-accent" },
                                    { label: "Pending", count: bookings.filter(b => b.status === "Pending").length, color: "bg-warning/10 border-warning/30 text-warning" },
                                    { label: "Confirmed", count: bookings.filter(b => b.status === "Confirmed").length, color: "bg-info/10 border-info/30 text-info" },
                                    { label: "Completed", count: bookings.filter(b => b.status === "Completed").length, color: "bg-success/10 border-success/30 text-success" }
                                ].map((stat, idx) => (
                                    <div key={idx} className={`${stat.color} rounded-2xl p-4 border-2 shadow-lg`}>
                                        <div className="text-3xl font-bold">{stat.count}</div>
                                        <div className="text-sm font-semibold opacity-80">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden lg:block my-6">
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="text-base border-b text-start">
                                                <th className="text-base-content">Sl</th>
                                                <th className="text-base-content">Service Details</th>
                                                <th className="text-base-content">Duration</th>
                                                <th className="text-base-content">Location</th>
                                                <th className="text-base-content">Amount</th>
                                                <th className="text-base-content">Status</th>
                                                <th className="text-base-content text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking, index) => (
                                                <tr key={booking._id} className="text-center transition-all border-b border-base-200">
                                                    <td className="font-bold text-accent text-lg">#{index + 1}</td>
                                                    <td>
                                                        <div className="font-bold text-base-content text-lg">{booking.serviceName || "Service"}</div>
                                                        <div className="text-sm text-base-content">{booking.serviceType}</div>
                                                    </td>
                                                    <td className="font-semibold">{booking.duration}</td>
                                                    <td>
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" />
                                                            <div>
                                                                <div className="font-semibold text-sm">{booking.location?.area}, {booking.location?.city}</div>
                                                                <div className="text-xs text-base-content/60">{booking.location?.district}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="font-bold text-accent text-xl">৳{booking.totalCost}</td>
                                                    <td>
                                                        {editingBooking === booking._id ? (
                                                            <div className="flex flex-col gap-2">
                                                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select select-bordered select-sm w-full max-w-xs">
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Confirmed">Confirmed</option>
                                                                    <option value="Completed">Completed</option>
                                                                    <option value="Cancelled">Cancelled</option>
                                                                </select>
                                                                <div className="flex gap-1">
                                                                    <button onClick={() => handleUpdateStatus(booking._id)} className="btn btn-success btn-xs flex-1">Save</button>
                                                                    <button onClick={() => { setEditingBooking(null); setNewStatus("");}} className="btn btn-ghost btn-xs flex-1">Cancel</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2 justify-center">
                                                            <Link href={`/my-bookings/${booking._id}`} className="btn btn-circle btn-sm bg-accent/10 hover:bg-accent hover:text-white border-accent/30 transition-all" title="View Details"> <Eye size={16} /></Link>
                                                            <button onClick={() => { setEditingBooking(booking._id); setNewStatus(booking.status);}} className="btn btn-circle btn-sm bg-info/10 hover:bg-info hover:text-white border-info/30 transition-all" title="Update Status" disabled={editingBooking === booking._id}><Edit2 size={16} /></button>
                                                            {booking.status === "Pending" && (
                                                                <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-circle btn-sm btn-error btn-outline hover:bg-error hover:text-white border-error/30 transition-all" title="Cancel Booking"><X size={16} /> </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="lg:hidden space-y-4">
                                {bookings.map((booking, index) => (
                                    <div key={booking._id} className="bg-base-300 rounded-2xl shadow-xl p-6 border-2 border-base-300 hover:shadow-2xl transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="text-xs font-bold text-accent mb-1">BOOKING #{index + 1}</div>
                                                <h3 className="font-bold text-xl text-base-content mb-1">{booking.serviceName || "Service"}</h3>
                                                <p className="text-sm text-base-content/60">{booking.serviceType}</p>
                                            </div>
                                            {editingBooking === booking._id ? (
                                                <div className="flex flex-col gap-2 ml-2">
                                                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="select select-bordered select-sm">
                                                        <option value="Pending">Pending</option>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                    <button onClick={() => handleUpdateStatus(booking._id)}className="btn btn-success btn-xs">Save</button>
                                                    <button onClick={() => { setEditingBooking(null); setNewStatus("");}} className="btn btn-error btn-outline btn-xs">Cancel </button>
                                                </div>
                                            ) : (
                                                <span className={getStatusBadge(booking.status)}>
                                                    {booking.status}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-3 mb-4 bg-base-200 rounded-2xl p-4">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-accent shrink-0" />
                                                <div className="flex-1">
                                                    <div className="text-xs text-base-content/60">Duration</div>
                                                    <div className="font-semibold">{booking.duration}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <div className="text-xs text-base-content/60">Location</div>
                                                    <div className="font-semibold text-sm">{booking.location?.area}, {booking.location?.city}</div>
                                                    <div className="text-xs text-base-content/60">{booking.location?.district}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 flex items-center justify-center text-accent shrink-0">৳</div>
                                                <div className="flex-1">
                                                    <div className="text-xs text-base-content/60">Total Cost</div>
                                                    <div className="font-bold text-accent text-2xl">৳{booking.totalCost}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <Link href={`/my-bookings/${booking._id}`} className="btn btn-sm btn-success btn-outline hover:bg-accent hover:text-white border-accent/30 col-span-1"><Eye size={16} />View</Link>
                                            <button onClick={() => { setEditingBooking(booking._id); setNewStatus(booking.status); }} className="btn btn-sm btn-accent btn-outline hover:bg-info hover:text-white border-info/30 col-span-1" disabled={editingBooking === booking._id}><Edit2 size={16} />Edit</button>
                                            {booking.status === "Pending" && (
                                                <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-sm btn-error btn-outline hover:bg-error hover:text-white border-error/30 col-span-1"><X size={16} />Cancel</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
        </ProtectedRoute >
    );
}
