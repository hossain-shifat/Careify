import React from 'react'
import { Heart, Shield, Users, Clock, Quote } from 'lucide-react';
import Heading from '@/components/Heading';

const features = [
    {
        icon: Heart,
        title: "Compassionate Care",
        description: "We connect families with verified, caring professionals who treat your loved ones with dignity and respect."
    },
    {
        icon: Shield,
        title: "Trusted & Verified",
        description: "Every caretaker is thoroughly vetted and background-checked to ensure the highest safety standards."
    },
    {
        icon: Users,
        title: "Personalized Matching",
        description: "Find the perfect caretaker based on your specific needs, location, and schedule requirements."
    },
    {
        icon: Clock,
        title: "Flexible Booking",
        description: "Book services on your terms - whether you need hourly care, daily support, or long-term assistance."
    }
];

const About = () => {
    return (
        <section className="py-16 px-4 bg-base-100">
            <div className="max-w-6xl mx-auto">
                {/* Main Heading */}
                <div className="text-center mb-12">
                    <Heading title='About' />
                    <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
                        Making Quality Caregiving Accessible to Everyone
                    </p>
                </div>
                <div className="bg-base-200 rounded-box shadow-lg p-8 mb-12 border border-base-300">
                    <h3 className="text-2xl font-semibold text-base-content mb-4 text-center">Our Mission</h3>
                    <p className="text-lg text-base-content/90 leading-relaxed text-center max-w-4xl mx-auto mb-6"> At <span className="bg-linear-to-r from-[#89f7fe] to-[#66a6ff] bg-clip-text text-transparent font-bold">Careify</span>, we believe deserves access to reliable, compassionate care services. Our platform bridges the gap between families in need and trusted caretakers, making it simple to find professional support for your children, elderly parents, or family members requiring special attention. </p>
                    <p className="text-lg text-base-content/90 leading-relaxed text-center max-w-4xl mx-auto">{"We understand that choosing someone to care for your loved ones is one of life's most importantdecisions. That's why we've built a secure, transparent platform that prioritizes safety,reliability, and peace of mind for every family we serve."}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-base-200 rounded-box p-6 shadow-md hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border border-base-300" >
                                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-accent" /></div>
                                <h4 className="text-xl font-semibold text-base-content mb-2">{feature.title}</h4>
                                <p className="text-base-content/80 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-base-200 rounded-box p-8 text-accent-content shadow-xl">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-white">Why Choose <span className="bg-linear-to-r from-[#89f7fe] to-[#66a6ff] bg-clip-text text-transparent font-bold">Careify</span>?</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2 text-white">24/7</div>
                            <p className="text-white/90">Available Support</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2 text-white">100%</div>
                            <p className="text-white/90">Verified Caretakers</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2 text-white">1000+</div>
                            <p className="text-white/90">Happy Families</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <p className="text-lg text-base-content/80 italic max-w-3xl mx-auto flex items-start gap-3 text-center">Our vision is to create a world where every family can easily access the care they need,building stronger communities through trusted relationships and compassionate service.</p>
                </div>
            </div>
        </section>
    )
}

export default About
