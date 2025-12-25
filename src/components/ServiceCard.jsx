import React from 'react';
import { Baby, Users, Stethoscope, Heart, Moon, MessageCircle, Star, ChevronRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const iconMap = {
    Baby: Baby,
    Users: Users,
    Stethoscope: Stethoscope,
    Heart: Heart,
    Moon: Moon,
    MessageCircle: MessageCircle
};

const ServiceCard = ({ service }) => {
    const Icon = iconMap[service.icon] || Heart;

    return (
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1">
            <figure className="relative h-48 overflow-hidden">
                <Image src={service.serviceImage} alt={service.serviceName} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-300 hover:scale-110" priority={false}/>
                {service.available && (
                    <div className="absolute top-4 right-4 badge badge-success gap-2 z-10">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <h1>Available</h1>
                    </div>
                )}
            </figure>
            <div className="card-body">
                <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 bg-accent/10 rounded-lg">
                        <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                        <h3 className="card-title text-xl mb-1">
                            {service.serviceName}
                        </h3>
                        <p className="text-sm text-base-content/60">
                            {service.serviceType}
                        </p>
                    </div>
                </div>
                <p className="text-base-content/70 text-sm line-clamp-2 mb-3">
                    {service.shortDescription}
                </p>
                <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-semibold">{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-base-content/60">
                        <Users className="w-4 h-4" />
                        <span>{service.totalReviews} reviews</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-base-content/60" />
                    <span className="text-sm text-base-content/70">
                        Experience: {service.experienceRequired}
                    </span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-2xl font-bold text-accent">
                            ৳{service.pricePerHour}
                        </p>
                        <p className="text-xs text-base-content/60">per hour</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">৳{service.pricePerDay}</p>
                        <p className="text-xs text-base-content/60">per day (8hrs)</p>
                    </div>
                </div>
                <div className="card-actions justify-between items-center mt-auto">
                    <Link href={`/service/${service._id}`} className="button btn-sm gap-2">
                        Book Now
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link href={`/services/${service._id}`} className="button btn-sm gap-2"> View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default ServiceCard;
