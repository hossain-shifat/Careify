import React from 'react'
import { UserPlus, Search, Calendar, CheckCircle } from 'lucide-react';
import Heading from '@/components/Heading';


const steps = [
    {
        id: 1,
        icon: UserPlus,
        title: 'Create Your Account',
        description: 'Sign up with your email or Google account in just a few clicks. Provide basic information to get started.'
    },
    {
        id: 2,
        icon: Search,
        title: 'Browse Services',
        description: 'Explore our range of care services including baby care, elderly care, sick people care, and special needs support.'
    },
    {
        id: 3,
        icon: Calendar,
        title: 'Book Your Service',
        description: 'Select your preferred service, choose duration and location, and confirm your booking with transparent pricing.'
    },
    {
        id: 4,
        icon: CheckCircle,
        title: 'Get Professional Care',
        description: 'Our verified caregivers will provide quality service at your doorstep. Track your booking status anytime.'
    }
];


const HowItWorks = () => {
  return (
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-base-100">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <Heading title="How It Works"/>
                  <p className="text-base-content/60 text-sm sm:text-base max-w-2xl mx-auto px-4">Getting started with Care.xyz is simple and straightforward</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
                  {steps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                          <div key={step.id} className="relative">
                              {index < steps.length - 1 && (
                                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-accent/20 -translate-x-1/2 z-0"></div>
                              )}
                              <div className="relative z-10 text-center">
                                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4 relative">
                                      <Icon className="w-8 h-8 text-accent" />
                                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                                          {step.id}
                                      </span>
                                  </div>
                                  <h3 className="text-lg sm:text-xl font-bold text-base-content mb-2">
                                      {step.title}
                                  </h3>
                                  <p className="text-base-content/60 text-xs sm:text-sm leading-relaxed">
                                      {step.description}
                                  </p>
                              </div>
                          </div>
                      )
                  })}
              </div>
          </div>
      </div>
  )
}

export default HowItWorks
