// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: function () {
                return this.provider === "credentials";
            },
        },
        nidNo: {
            type: String,
            trim: true,
        },
        contact: {
            type: String,
            trim: true,
        },
        provider: {
            type: String,
            enum: ["credentials", "google"],
            default: "credentials",
        },
        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
