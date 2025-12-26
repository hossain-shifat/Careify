// src/app/api/bookings/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import mongoose from "mongoose";

// PATCH: Update booking status
export async function PATCH(request, { params }) {
    try {
        await connectDB();

        // Next.js 15+ requires awaiting params
        const { id } = await params;

        console.log("Received booking ID:", id); // Debug log

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid booking ID format" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        console.log("Received status:", status); // Debug log

        // Validate status
        const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}. Received: ${status}` },
                { status: 400 }
            );
        }

        // Find and update the booking
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Booking status updated successfully",
                booking: updatedBooking
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating booking:", error);
        return NextResponse.json(
            { error: "Failed to update booking status: " + error.message },
            { status: 500 }
        );
    }
}
