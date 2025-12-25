'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, X, Clock, Users, Shield, Award, ChevronRight, Calendar, Heart, Share2, TrendingUp, Phone, Mail, BadgeCheck } from 'lucide-react';

export default function ServiceDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedPricing, setSelectedPricing] = useState('day')
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/services/${params.id}`);
                const data = await response.json();
                setService(data);
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [params.id]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`w-4 h-4 md:w-5 md:h-5 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-accent"></div>
                    <p className="mt-4 text-base-content/60">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">😔</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2">
                        Service Not Found
                    </h2>
                    <p className="text-base-content/60 mb-6">
                        We couldn&apos;t find the service you&apos;re looking for.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/" className="btn btn-accent">
                            Go Home
                        </Link>
                        <Link href="/OurService" className="btn btn-outline">
                            Browse Services
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="border-b border-base-300">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-base-content/60 overflow-x-auto">
                        <Link href="/" className="hover:text-accent transition-colors whitespace-nowrap">
                            Home
                        </Link>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                        <Link href="/services" className="hover:text-accent transition-colors whitespace-nowrap">
                            Services
                        </Link>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                        <span className="text-base-content font-medium truncate">{service.serviceName}</span>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="p-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 py-8 lg:py-0 items-center md:px-10">
                        <div className="relative h-64 md:h-96 lg:h-100 rounded-lg overflow-hidden shadow-lg">
                            <Image src={service.serviceImage} alt={service.serviceName} fill className="object-cover" priority />
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="flex gap-3">
                                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                                    {service.serviceType}
                                </span>
                                {service.available && (
                                    <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm font-semibold flex items-center gap-1">
                                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                        Available
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
                                {service.serviceName}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="flex">{renderStars(service.rating)}</div>
                                <span className="text-base-content font-semibold">{service.rating}</span>
                                <span className="text-base-content/60">({service.totalReviews} reviews)</span>
                            </div>
                            <p className="text-base-content/70">{service.shortDescription}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg shadow-sm">
                                    <Clock className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-xs text-base-content/60">Experience</p>
                                        <p className="text-sm font-semibold text-base-content">{service.experienceRequired}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-base-200 rounded-lg shadow-sm">
                                    <Users className="w-5 h-5 text-accent" />
                                    <div>
                                        <p className="text-xs text-base-content/60">Caregiver</p>
                                        <p className="text-sm font-semibold text-base-content">{service.caregiverGender}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                {/* <div className="flex gap-3 lg:hidden">
                                    <Link href={`/booking/${params.id}`} className="btn btn-accent flex-1">
                                        <Calendar className="w-5 h-5" /> Book Now
                                    </Link>
                                    <button onClick={() => setIsFavorite(!isFavorite)} className={`btn btn-outline ${isFavorite ? 'btn-error' : ''}`}>
                                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    </button>
                                </div> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-linear-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                                        <div className="p-2 bg-accent/20 rounded-lg">
                                            <Calendar className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/60">Availability</p>
                                            <p className="text-sm font-semibold text-base-content">Book Anytime</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-linear-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
                                        <div className="p-2 bg-success/20 rounded-lg">
                                            <Award className="w-6 h-6 text-success" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-base-content/60">Response Time</p>
                                            <p className="text-sm font-semibold text-base-content">Within 1 hour</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="lg:hidden bg-base-200 rounded-lg shadow-md p-6 border border-accent/20">
                        <h3 className="text-xl font-bold mb-4">Choose Your Plan</h3>
                        <div className="flex gap-2 mb-6 bg-base-300 p-1 rounded-lg">
                            <button onClick={() => setSelectedPricing('hour')} className={`flex-1 py-2 px-4 rounded-md font-medium transition ${selectedPricing === 'hour' ? 'bg-accent text-accent-content shadow-md' : 'text-base-content/60 hover:text-base-content'}`}>Hourly</button>
                            <button onClick={() => setSelectedPricing('day')} className={`flex-1 py-2 px-4 rounded-md font-medium transition ${selectedPricing === 'day' ? 'bg-accent text-accent-content shadow-md' : 'text-base-content/60 hover:text-base-content'}`}>Daily</button>
                        </div>
                        <div className="text-center mb-6 p-6 bg-linear-to-br from-accent/5 to-accent/10 rounded-lg">
                            <p className="text-5xl font-bold text-accent">৳{selectedPricing === 'hour' ? service.pricePerHour : service.pricePerDay}</p>
                            <p className="text-base-content/60 mt-2">per {selectedPricing === 'hour' ? 'hour' : 'day'}</p>
                        </div>
                        <Link href={`/booking/${params.id}`} className="btn btn-accent w-full mb-4">
                            <Calendar className="w-5 h-5" /> Book Now
                        </Link>
                        <div className="flex gap-3">
                            <button onClick={() => setIsFavorite(!isFavorite)} className={`btn btn-outline flex-1 ${isFavorite ? 'btn-error' : ''}`}>
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button className="btn btn-outline flex-1">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="bg-base-200 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                        <p className="text-base-content/80 leading-relaxed">{service.fullDescription}</p>
                    </div>
                    <div className="bg-base-200 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">What&apos;s Included</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {service.includes.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 rounded-lg hover:bg-success/5 transition">
                                    <Check className="w-5 h-5 text-success shrink-0" />
                                    <span className="text-base-content/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-base-200 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">What&apos;s Not Included</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {service.notIncludes.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 rounded-lg hover:bg-error/5 transition">
                                    <X className="w-5 h-5 text-error shrink-0" />
                                    <span className="text-base-content/60">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-linear-to-br from-accent/5 to-accent/10 rounded-lg shadow-md p-6 border border-accent/20">
                        <h2 className="text-2xl font-bold mb-6">Trust & Safety</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <Shield className="w-10 h-10 text-accent mx-auto mb-2" />
                                <p className="font-semibold text-base-content">Background Checked</p>
                                <p className="text-sm text-base-content/60">Verified caregivers</p>
                            </div>
                            <div className="text-center">
                                <BadgeCheck className="w-10 h-10 text-accent mx-auto mb-2" />
                                <p className="font-semibold text-base-content">Certified</p>
                                <p className="text-sm text-base-content/60">Licensed pros</p>
                            </div>
                            <div className="text-center">
                                <Award className="w-10 h-10 text-accent mx-auto mb-2" />
                                <p className="font-semibold text-base-content">Quality Assured</p>
                                <p className="text-sm text-base-content/60">100% satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden bg-base-200 rounded-lg shadow-md p-6 space-y-4">
                        <h3 className="text-lg font-bold text-base-content mb-2">Need Help?</h3>
                        <a href="tel:+8801234567890" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition border border-base-300">
                            <Phone className="w-5 h-5 text-accent" />
                            <span className="text-base-content">+880 123 456 7890</span>
                        </a>
                        <a href="mailto:support@careify.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition border border-base-300">
                            <Mail className="w-5 h-5 text-accent" />
                            <span className="text-base-content">support@careify.com</span>
                        </a>
                    </div>
                    <div className="bg-base-200 rounded-lg shadow-md p-6 flex items-center justify-between">
                        <p className="text-base-content/70">Trusted by {service.totalReviews}+ satisfied customers</p>
                        <div className="flex items-center gap-2 text-accent">
                            <TrendingUp className="w-5 h-5" /> {service.totalReviews}+
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block space-y-6 sticky top-6">
                    <div className="bg-base-200 rounded-lg shadow-md p-6 border border-accent/20">
                        <h3 className="text-xl font-bold mb-4">Choose Your Plan</h3>
                        <div className="flex gap-2 mb-6 bg-base-300 p-1 rounded-lg">
                            <button onClick={() => setSelectedPricing('hour')} className={`flex-1 py-2 px-4 rounded-md font-medium transition ${selectedPricing === 'hour' ? 'bg-accent text-accent-content shadow-md' : 'text-base-content/60 hover:text-base-content'}`}>Hourly</button>
                            <button onClick={() => setSelectedPricing('day')} className={`flex-1 py-2 px-4 rounded-md font-medium transition ${selectedPricing === 'day' ? 'bg-accent text-accent-content shadow-md' : 'text-base-content/60 hover:text-base-content'}`}>Daily</button>
                        </div>
                        <div className="text-center mb-6 p-6 bg-linear-to-br from-accent/5 to-accent/10 rounded-lg">
                            <p className="text-5xl font-bold text-accent">৳{selectedPricing === 'hour' ? service.pricePerHour : service.pricePerDay}</p>
                            <p className="text-base-content/60 mt-2">per {selectedPricing === 'hour' ? 'hour' : 'day'}</p>
                        </div>
                        <Link href={`/booking/${params.id}`} className="btn btn-accent w-full mb-4">Book Now</Link>
                        <div className="flex gap-3">
                            <button onClick={() => setIsFavorite(!isFavorite)} className={`btn btn-outline flex-1 ${isFavorite ? 'btn-error' : ''}`}>
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button className="btn btn-outline flex-1">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="bg-base-200 rounded-lg shadow-md p-6 space-y-4">
                        <h3 className="text-lg font-bold text-base-content mb-2">Need Help?</h3>
                        <a href="tel:+8801234567890" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition">
                            <Phone className="w-5 h-5 text-accent" /> +880 123 456 7890
                        </a>
                        <a href="mailto:support@careify.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition">
                            <Mail className="w-5 h-5 text-accent" /> support@careify.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
