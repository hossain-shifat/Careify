import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
    try {
        const { name, email, password, nidNo, contact } = await request.json();

        // Validation
        if (!name || !email || !password || !nidNo || !contact) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json(
                {
                    error:
                        "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter",
                },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            nidNo,
            contact,
            provider: "credentials",
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
