import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
    {
        serviceName: { type: String, required: true },
        serviceType: { type: String, required: true },
        shortDescription: { type: String },
        fullDescription: { type: String },
        pricePerHour: { type: Number },
        pricePerDay: { type: Number },
        experienceRequired: { type: String },
        caregiverGender: { type: String },
        serviceImage: { type: String },
        available: { type: Boolean, default: true },
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        includes: { type: [mongoose.Schema.Types.Mixed] },
        notIncludes: { type: [mongoose.Schema.Types.Mixed] },
    },
    { timestamps: true }
)

export default mongoose.models.Service ||
    mongoose.model('Service', ServiceSchema, 'service')
