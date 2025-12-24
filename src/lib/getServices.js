import Service from '@/models/Service'
import connectDB from './mongodb'

export async function getServices() {
    await connectDB()
    const services = await Service.find().lean()
    return services
}
