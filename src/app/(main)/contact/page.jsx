"use client";

import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        alert("Thank you! Your message has been sent.");
    };

    return (
        <div className="min-h-screen bg-base-100 py-16 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h1 className="text-5xl font-bold gradient-text">Get in Touch</h1>
                    <p className="text-gray-600">
                        We are here to help you with any queries or concerns. Reach out to us through the form or the following contact details.
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="text-accent" />
                            <span>support@careify.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-accent" />
                            <span>+880 1234 567890</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-accent" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="text-accent" />
                            <span>www.careify.com</span>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902472569856!2d90.3904236149797!3d23.75090368459084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b0c77b6bbd%3A0xa21f6eaf6f88a37d!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                            className="w-full h-full"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-base-300 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition duration-300 hover:border-accent"
                        />
                        {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}

                        <input
                            type="email"
                            placeholder="Your Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition duration-300 hover:border-accent"
                        />
                        {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}

                        <textarea
                            placeholder="Your Message"
                            {...register("message", { required: "Message is required" })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-accent transition duration-300 hover:border-accent resize-none"
                        />
                        {errors.message && <p className="text-error text-sm">{errors.message.message}</p>}

                        <button
                            type="submit"
                            className="w-full btn btn-accent text-base-content hover:scale-105 transition-transform duration-300"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Optional: Newsletter CTA */}
                    <div className="mt-12 bg-base-100 rounded-xl p-6 text-center shadow-inner">
                        <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                        <p className="text-gray-600 mb-4">Subscribe to our newsletter to get the latest updates.</p>
                        <div className="flex gap-2 justify-center flex-wrap">
                            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent outline-none" />
                            <button className="btn btn-accent">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional: FAQ Section */}
            <div className="mt-24 max-w-5xl mx-auto space-y-8">
                <h2 className="text-4xl font-bold text-center gradient-text mb-8">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-base-300 p-6 rounded-xl shadow-lg">
                        <h4 className="font-semibold mb-2">How long will it take to get a response?</h4>
                        <p className="text-gray-600">We usually respond within 24-48 hours.</p>
                    </div>
                    <div className="bg-base-300 p-6 rounded-xl shadow-lg">
                        <h4 className="font-semibold mb-2">Can I book services online?</h4>
                        <p className="text-gray-600">Yes, you can book all our services through the website.</p>
                    </div>
                    <div className="bg-base-300 p-6 rounded-xl shadow-lg">
                        <h4 className="font-semibold mb-2">Do you offer support for emergencies?</h4>
                        <p className="text-gray-600">Yes, our emergency contact is available 24/7.</p>
                    </div>
                    <div className="bg-base-300 p-6 rounded-xl shadow-lg">
                        <h4 className="font-semibold mb-2">Can I visit your office?</h4>
                        <p className="text-gray-600">Yes, our office in Dhaka is open during regular business hours.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
