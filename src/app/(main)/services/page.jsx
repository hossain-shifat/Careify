import ServiceCard from '@/components/ServiceCard'
import { getServices } from '@/lib/getServices'

const ServicesPage = async () => {
    const services = await getServices()

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => <ServiceCard key={service._id} service={service}/>)}
        </div>
    )
}

export default ServicesPage
