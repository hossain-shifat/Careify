import React from 'react'

const faqs = [
    {
        question: 'How do I create an account?',
        answer: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
    },
    {
        question: 'How do I book a care service?',
        answer: 'Browse our services, select the one you need, choose your duration and location, and confirm your booking. You\'ll receive instant confirmation.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including credit/debit cards and online payment gateways for your convenience.'
    },
    {
        question: 'Can I cancel or reschedule my booking?',
        answer: 'Yes, you can cancel or reschedule your booking from the "My Bookings" page. Please check our cancellation policy for details.'
    },
    {
        question: 'Are the caregivers verified and trained?',
        answer: 'Absolutely! All our caregivers go through rigorous background checks and professional training to ensure quality service.'
    },
    {
        question: 'How do I track my booking status?',
        answer: 'Go to "My Bookings" page in your account to view all your bookings with their current status (Pending/Confirmed/Completed).'
    }
];

const FAQ = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-base-100">
            <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-base-content mb-10 sm:mb-12 text-center">Frequently Asked Questions</h3>
                <div className="space-y-1">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box">
                            <input type="radio" name="how-it-works-accordion" defaultChecked={index === 0} />
                            <div className="collapse-title font-semibold text-sm sm:text-base">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-xs sm:text-sm text-base-content/70">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ
