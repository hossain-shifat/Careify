// app/api/bookings/[id]/route.js
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET(request, { params }) {
    let client;

    try {
        const { id } = params;

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        // Get single booking
        const booking = await bookingsCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, booking },
            { status: 200 }
        );

    } catch (error) {
        console.error('Fetch booking error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}

export async function PATCH(request, { params }) {
    let client;

    try {
        const { id } = params;
        const updateData = await request.json();

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        // Update booking
        const result = await bookingsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...updateData,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Booking updated successfully'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Update booking error:', error);
        return NextResponse.json(
            { error: 'Failed to update booking', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}

export async function DELETE(request, { params }) {
    let client;

    try {
        const { id } = params;

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        // Delete booking (or update status to Cancelled)
        const result = await bookingsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status: 'Cancelled',
                    updatedAt: new Date()
                }
            }
        );

        // Alternative: Permanently delete
        // const result = await bookingsCollection.deleteOne({
        //     _id: new ObjectId(id)
        // });

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Booking cancelled successfully'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Cancel booking error:', error);
        return NextResponse.json(
            { error: 'Failed to cancel booking', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}
