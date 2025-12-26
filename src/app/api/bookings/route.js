import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { sendInvoiceEmail } from '@/lib/sendInvoiceEmail';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;

    try {
        const bookingData = await request.json();
        
        if (!bookingData.serviceId || !bookingData.customerInfo?.email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

        const booking = {
            ...bookingData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await bookingsCollection.insertOne(booking);

        try {
            await sendInvoiceEmail({
                ...booking,
                _id: result.insertedId
            });
        } catch (emailError) {
            console.error('Invoice email failed:', emailError);
        }

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
            { error: 'Failed to create booking' },
            { status: 500 }
        );
    } finally {
        if (client) await client.close();
    }
}

export async function GET(request) {
    let client;

    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        client = await MongoClient.connect(uri);
        const db = client.db('Careify');
        const bookingsCollection = db.collection('bookings');

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
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    } finally {
        if (client) await client.close();
    }
}
