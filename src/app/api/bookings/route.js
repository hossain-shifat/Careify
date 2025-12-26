// app/api/bookings/route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;

    try {
        const bookingData = await request.json();

        // Validate required fields
        if (!bookingData.serviceId || !bookingData.customerInfo?.email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        // Add timestamps
        const booking = {
            ...bookingData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Insert booking
        const result = await bookingsCollection.insertOne(booking);

        return NextResponse.json(
            {
                success: true,
                bookingId: result.insertedId,
                message: 'Booking created successfully'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create booking', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}

export async function GET(request) {
    let client;

    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        // Get bookings
        const query = email ? { 'customerInfo.email': email } : {};
        const bookings = await bookingsCollection
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(
            { success: true, bookings },
            { status: 200 }
        );

    } catch (error) {
        console.error('Fetch bookings error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bookings', details: error.message },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}
