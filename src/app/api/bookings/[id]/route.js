import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { status } = body;

        // Validate status
        const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status value" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db("Careify");
        const bookings = database.collection("bookings");

        // Update the booking status
        const result = await bookings.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status: status,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Booking status updated successfully",
            status: status
        });

    } catch (error) {
        console.error("Error updating booking:", error);
        return NextResponse.json(
            { error: "Failed to update booking status" },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;

        await client.connect();
        const database = client.db("Careify");
        const bookings = database.collection("bookings");

        // Get the booking by ID
        const booking = await bookings.findOne({ _id: new ObjectId(id) });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ booking });

    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json(
            { error: "Failed to fetch booking" },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
