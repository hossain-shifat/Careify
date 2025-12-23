import React from 'react';
import { Baby, Users, HeartPulse, Accessibility } from 'lucide-react';

const services = [
    {
        id: 'baby-care',
        title: 'Baby Care',
        description: 'Expert childcare services providing a safe, nurturing environment for your little ones. Our certified caregivers ensure proper development, nutrition, and round-the-clock supervision.',
        icon: Baby,
        serviceType: 'Childcare & Babysitting',
        availability: 'Available 24/7'
    },
    {
        id: 'elderly-service',
        title: 'Elderly Service',
        description: 'Comprehensive elderly care with dignity and respect. Professional assistance with daily living activities, medication management, and compassionate companionship.',
        icon: Users,
        serviceType: 'Senior Care & Support',
        availability: 'Daily Care Plans'
    },
    {
        id: 'sick-people-service',
        title: 'Sick People Service',
        description: 'Specialized medical care services for individuals requiring health monitoring and recovery assistance. Trained healthcare professionals provide personalized attention.',
        icon: HeartPulse,
        serviceType: 'Medical & Recovery Care',
        availability: 'Professional Staff'
    },
    {
        id: 'special-care',
        title: 'Special Care',
        description: 'Personalized care for individuals with disabilities or special needs. Our trained caregivers focus on comfort, independence, and emotional well-being through tailored support plans.',
        icon: Accessibility,
        serviceType: 'Disability & Special Needs Care',
        availability: 'Customized Care Plans'
    }
];

const OurService = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-2 sm:mb-3">Our Services</h2>
                    <p className="text-base-content/60 text-sm sm:text-base max-w-2xl mx-auto px-4"> Professional care services tailored to meet your family&apos;s unique needs</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 *:shadow-md *:hover:shadow-xl *:hover:shadow-accent">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <div key={service.id} className="bg-base-100 rounded-box p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 flex flex-col hover:scale-105" >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-6">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-base-content mb-2 sm:mb-3"> {service.title} </h3>
                                <div className="inline-block px-2.5 sm:px-3 py-1 bg-base-200 rounded-full text-xs font-medium text-base-content/70 mb-3 sm:mb-4 w-fit">
                                    {service.serviceType}
                                </div>
                                <p className="text-base-content/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 grow"> {service.description} </p>
                                <div className="flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-base-content/60">
                                    <div className="w-2 h-2 bg-success rounded-full shrink-0"></div>
                                    <span>{service.availability}</span>
                                </div>
                                <button className="button w-full text-sm sm:text-base"> Learn More </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurService;
