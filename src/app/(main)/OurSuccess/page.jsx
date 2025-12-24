import { Star, TrendingUp, CheckCircle, Award, Users } from 'lucide-react';
import Image from 'next/image';

export default function OurSuccess() {
    const testimonials = [
        {
            name: "Sarah Ahmed",
            role: "Mother of Two",
            image: "https://i.pravatar.cc/150?img=1",
            rating: 5,
            text: "Careify made finding a reliable babysitter so easy! The booking process was seamless, and the caretaker we hired was professional and caring. My kids loved her!"
        },
        {
            name: "Kamal Hossain",
            role: "Son of Elderly Parent",
            image: "https://i.pravatar.cc/150?img=12",
            rating: 5,
            text: "My father needed daily care, and Careify connected us with an amazing caretaker. The peace of mind knowing he's in good hands is priceless. Highly recommend!"
        },
        {
            name: "Nusrat Rahman",
            role: "Working Professional",
            image: "https://i.pravatar.cc/150?img=5",
            rating: 5,
            text: "As a working mom, finding trustworthy childcare was my biggest challenge. Careify's verified caretakers and easy scheduling have been a lifesaver for our family."
        },
        {
            name: "Imran Sheikh",
            role: "Family Caregiver",
            image: "https://i.pravatar.cc/150?img=13",
            rating: 5,
            text: "The platform is user-friendly and transparent. We found a specialized caretaker for my sister's recovery period. The service exceeded our expectations!"
        }
    ];

    const successMetrics = [
        {
            icon: Users,
            value: "5000+",
            label: "Families Served",
            color: "text-primary"
        },
        {
            icon: CheckCircle,
            value: "10,000+",
            label: "Successful Bookings",
            color: "text-success"
        },
        {
            icon: Award,
            value: "500+",
            label: "Verified Caretakers",
            color: "text-secondary"
        },
        {
            icon: TrendingUp,
            value: "98%",
            label: "Satisfaction Rate",
            color: "text-accent"
        }
    ];

    return (
        <section className="py-16 px-4 bg-base-200">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-base-content mb-4">Our <span className="gradient-text">Success Story</span></h2>
                        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-xl text-base-content/80 max-w-2xl mx-auto">Trusted by thousands of families across Bangladesh</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {successMetrics.map((metric, index) => {
                            const Icon = metric.icon;
                            return (
                                <div key={index} className="bg-base-100 rounded-box p-6 text-center shadow-md hover:shadow-xl hover:shadow-accent transition-all duration-300 border border-base-300" >
                                    <div className="flex justify-center mb-3"> <Icon className={`w-10 h-10 ${metric.color}`} /> </div>
                                    <div className="text-3xl font-bold text-base-content mb-2"> {metric.value} </div>
                                    <div className="text-base-content/70 font-medium"> {metric.label} </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-base-content mb-4">What Our <span className="gradient-text">Families Say</span></h2>
                        <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-xl text-base-content/80 max-w-2xl mx-auto">Real experiences from real families</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-base-100 rounded-box p-6 shadow-md hover:shadow-xl hover:shadow-accent transition-all duration-300 border border-base-300" >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                                    ))}
                                </div>
                                <p className="text-base-content/90 text-lg leading-relaxed mb-6 italic"> &quot;{testimonial.text}&quot; </p>
                                <div className="flex items-center gap-4">
                                    <Image src={testimonial.image} alt={testimonial.name} width={56} height={56} className="rounded-full border-2 border-accent/30" />
                                    <div>
                                        <h4 className="font-semibold text-base-content text-lg">{testimonial.name}</h4>
                                        <p className="text-base-content/70">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-lg text-base-content/80 mb-6">Join thousands of satisfied families who trust Careify</p>
                        <button className="button">Get Started Today</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
