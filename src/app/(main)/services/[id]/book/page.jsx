'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, ChevronRight, Home, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const [service, setService] = useState(null);
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues: { fullName: '', email: '', phone: '', durationType: 'day', duration: 1, startDate: '', startTime: '', region: '', district: '', city: '', area: '', address: '', specialRequirements: '' } })

    const durationType = watch('durationType');
    const duration = watch('duration');
    const selectedRegion = watch('region');
    const selectedDistrict = watch('district');
    const selectedCity = watch('city');
    const selectedArea = watch('area');
    const startDate = watch('startDate');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [serviceRes, centersRes] = await Promise.all([
                    fetch(`/api/services/${params.id}`),
                    fetch('/service-centers.json')
                ]);

                const serviceData = await serviceRes.json();
                const centersData = await centersRes.json();

                setService(serviceData);
                setServiceCenters(centersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    const regions = [...new Set(serviceCenters.map(center => center.region))];

    const districts = selectedRegion
        ? [...new Set(serviceCenters.filter(c => c.region === selectedRegion).map(c => c.district))]
        : [];

    const cities = selectedDistrict
        ? [...new Set(serviceCenters.filter(c => c.district === selectedDistrict).map(c => c.city))]
        : [];

    const areas = selectedCity
        ? serviceCenters.find(c => c.city === selectedCity)?.covered_area || []
        : [];

    useEffect(() => {
        setValue('district', '');
        setValue('city', '');
        setValue('area', '');
    }, [selectedRegion, setValue]);

    useEffect(() => {
        setValue('city', '');
        setValue('area', '');
    }, [selectedDistrict, setValue]);

    useEffect(() => {
        setValue('area', '');
    }, [selectedCity, setValue]);

    const calculateTotal = () => {
        if (!service) return 0;
        const rate = durationType === 'hour' ? service.pricePerHour : service.pricePerDay;
        return rate * duration;
    }
    const onSubmit = async (data) => {
        setSubmitting(true);

        const bookingData = {
            serviceId: params.id,
            serviceName: service.serviceName,
            serviceType: service.serviceType,
            durationType: data.durationType,
            duration: parseInt(data.duration),
            location: {
                region: data.region,
                district: data.district,
                city: data.city,
                area: data.area,
                address: data.address
            },
            startDate: data.startDate,
            startTime: data.durationType === 'hour' ? data.startTime : null,
            customerInfo: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                specialRequirements: data.specialRequirements
            },
            totalCost: calculateTotal(),
            status: 'Pending',
            bookingDate: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) throw new Error('Booking failed');

            const result = await response.json();
            console.log('Booking successful:', result);
            setBookingSuccess(true);

            setTimeout(() => {
                router.push('/my-bookings');
            }, 3000);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-accent"></div>
                    <p className="mt-4 text-base-content/60">Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-base-content mb-2">Service Not Found</h2>
                    <p className="text-base-content/60 mb-6">Unable to load service details.</p>
                    <Link href="/services" className="btn btn-accent">Browse Services</Link>
                </div>
            </div>
        );
    }

    if (bookingSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="text-center max-w-md bg-base-100 p-8 rounded-lg shadow-xl">
                    <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-base-content mb-2">Booking Confirmed!</h2>
                    <p className="text-base-content/70 mb-4">
                        Your booking has been successfully placed with status: <span className="font-semibold text-warning">Pending</span>
                    </p>
                    <div className="bg-accent/10 p-4 rounded-lg mb-6">
                        <p className="text-sm text-base-content/80">
                            We&apos;ll contact you shortly to confirm your booking details.
                        </p>
                    </div>
                    <Link href="/my-bookings" className="btn btn-accent w-full">
                        <Home className="w-5 h-5" /> View My Bookings
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className=" bg-base-200">
                <div className="border-b border-base-300 bg-base-100">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-base-content/60">
                            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href={`/services/${params.id}`} className="hover:text-accent transition-colors">{service.serviceName}</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-base-content font-medium">Book Now</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-base-100 rounded-xl shadow-lg p-8">
                                    <h1 className="text-3xl font-bold text-base-content mb-8">Complete Your Booking</h1>

                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
                                                <User className="w-5 h-5 text-accent" /> Personal Information
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Full Name <span className="text-error">*</span></span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register('fullName', { required: 'Full name is required' })}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.fullName ? 'input-error' : ''}`}
                                                        placeholder="Enter your full name"
                                                    />
                                                    {errors.fullName && <span className="text-error text-xs mt-1">{errors.fullName.message}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Email <span className="text-error">*</span></span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /\S+@\S+\.\S+/,
                                                                message: 'Invalid email address'
                                                            }
                                                        })}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.email ? 'input-error' : ''}`}
                                                        placeholder="your.email@example.com"
                                                    />
                                                    {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                                                </div>
                                                <div className="form-control md:col-span-2">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Phone Number <span className="text-error">*</span></span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        {...register('phone', {
                                                            required: 'Phone number is required',
                                                            pattern: {
                                                                value: /^(\+8801|01)[3-9]\d{8}$/,
                                                                message: 'Invalid Bangladesh phone number'
                                                            }
                                                        })}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.phone ? 'input-error' : ''}`}
                                                        placeholder="+880 1XXX-XXXXXX"
                                                    />
                                                    {errors.phone && <span className="text-error text-xs mt-1">{errors.phone.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-accent" /> Service Duration
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Duration Type <span className="text-error">*</span></span>
                                                    </label>
                                                    <select
                                                        {...register('durationType')}
                                                        className="w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md"
                                                    >
                                                        <option value="hour">Hourly</option>
                                                        <option value="day">Daily</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Number of {durationType === 'hour' ? 'Hours' : 'Days'} <span className="text-error">*</span></span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        {...register('duration', {
                                                            required: 'Duration is required',
                                                            min: { value: 1, message: 'Duration must be at least 1' }
                                                        })}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.duration ? 'input-error' : ''}`}
                                                    />
                                                    {errors.duration && <span className="text-error text-xs mt-1">{errors.duration.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-accent" /> Start Date & Time
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Start Date <span className="text-error">*</span></span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register('startDate', { required: 'Start date is required' })}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.startDate ? 'input-error' : ''}`}
                                                    />
                                                    {errors.startDate && <span className="text-error text-xs mt-1">{errors.startDate.message}</span>}
                                                </div>
                                                {durationType === 'hour' && (
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text font-medium">Start Time <span className="text-error">*</span></span>
                                                        </label>
                                                        <input
                                                            type="time"
                                                            {...register('startTime', {
                                                                required: durationType === 'hour' ? 'Start time is required' : false
                                                            })}
                                                            className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.startTime ? 'input-error' : ''}`}
                                                        />
                                                        {errors.startTime && <span className="text-error text-xs mt-1">{errors.startTime.message}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-accent" /> Service Location
                                            </h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Region/Division <span className="text-error">*</span></span>
                                                    </label>
                                                    <select
                                                        {...register('region', { required: 'Please select a region' })}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.region ? 'select-error' : ''}`}
                                                    >
                                                        <option value="">Select Region</option>
                                                        {regions.map(region => (
                                                            <option key={region} value={region}>{region}</option>
                                                        ))}
                                                    </select>
                                                    {errors.region && <span className="text-error text-xs mt-1">{errors.region.message}</span>}
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">District <span className="text-error">*</span></span>
                                                    </label>
                                                    <select
                                                        {...register('district', { required: 'Please select a district' })}
                                                        disabled={!selectedRegion}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.district ? 'select-error' : ''}`}
                                                    >
                                                        <option value="">Select District</option>
                                                        {districts.map(district => (
                                                            <option key={district} value={district}>{district}</option>
                                                        ))}
                                                    </select>
                                                    {errors.district && <span className="text-error text-xs mt-1">{errors.district.message}</span>}
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">City <span className="text-error">*</span></span>
                                                    </label>
                                                    <select
                                                        {...register('city', { required: 'Please select a city' })}
                                                        disabled={!selectedDistrict}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.city ? 'select-error' : ''}`}
                                                    >
                                                        <option value="">Select City</option>
                                                        {cities.map(city => (
                                                            <option key={city} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                    {errors.city && <span className="text-error text-xs mt-1">{errors.city.message}</span>}
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Area <span className="text-error">*</span></span>
                                                    </label>
                                                    <select
                                                        {...register('area', { required: 'Please select an area' })}
                                                        disabled={!selectedCity}
                                                        className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.area ? 'select-error' : ''}`}
                                                    >
                                                        <option value="">Select Area</option>
                                                        {areas.map(area => (
                                                            <option key={area} value={area}>{area}</option>
                                                        ))}
                                                    </select>
                                                    {errors.area && <span className="text-error text-xs mt-1">{errors.area.message}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:flex md:justify-between gap-4">
                                            <div className="flex-1 form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Detailed Address <span className="text-error">*</span>
                                                    </span>
                                                </label>
                                                <textarea
                                                    {...register('address', { required: 'Address is required' })}
                                                    className={`w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md ${errors.address ? 'textarea-error' : ''
                                                        }`}
                                                    rows={4}
                                                    placeholder="House/Flat number, Street, Landmark..."
                                                />
                                                {errors.address && (
                                                    <span className="text-error text-xs mt-1">
                                                        {errors.address.message}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">
                                                        Special Requirements (Optional)
                                                    </span>
                                                </label>
                                                <textarea {...register('specialRequirements')} className="w-full p-3 bg-base-100 rounded-xl border focus-within:outline outline-[#94A3B8] placeholder:text-[#94A3B8] text-base-content text-md" rows={4} placeholder="Any specific needs or preferences..." />
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <button type="submit" disabled={submitting} className="btn btn-accent w-full text-lg" >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-5 h-5" />
                                                        Confirm Booking
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Summary Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-base-100 rounded-xl shadow-lg p-6 sticky top-6">
                                    <h3 className="text-xl font-bold text-base-content mb-4">Booking Summary</h3>
                                    <div className="flex gap-4 mb-4 pb-4 border-b border-base-300">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                            <Image src={service.serviceImage} alt={service.serviceName} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-base-content">{service.serviceName}</h4>
                                            <p className="text-sm text-base-content/60">{service.serviceType}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-base-content/70">Rate</span>
                                            <span className="font-semibold">
                                                ৳{durationType === 'hour' ? service.pricePerHour : service.pricePerDay} / {durationType}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-base-content/70">Duration</span>
                                            <span className="font-semibold">{duration} {durationType}{duration > 1 ? 's' : ''}</span>
                                        </div>
                                        {selectedRegion && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-base-content/70">Location</span>
                                                <span className="font-semibold text-right">{selectedArea || selectedCity || selectedDistrict || selectedRegion}</span>
                                            </div>
                                        )}
                                        {startDate && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-base-content/70">Start Date</span>
                                                <span className="font-semibold">{new Date(startDate).toLocaleDateString('en-GB')}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-base-300 pt-4 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-base-content">Total Cost</span>
                                            <span className="text-2xl font-bold text-accent">৳{calculateTotal()}</span>
                                        </div>
                                    </div>
                                    <div className="bg-accent/10 rounded-lg p-4 text-sm text-base-content/80">
                                        <p className="font-semibold mb-2">📋 Booking Status: <span className="text-warning">Pending</span></p>
                                        <p>Your booking will be confirmed after verification. We&apos;ll contact you shortly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
}
