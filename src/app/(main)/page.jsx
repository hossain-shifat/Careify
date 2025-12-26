import Banner from "@/components/Banner";
import Image from "next/image";
import About from "./About/page";
import OurSuccess from "./OurSuccess/page";
import OurService from "./OurService/page";
import HowItWorks from "./HowITWorks/page";
import FAQ from "./FAQ/FAQ";

export const metadata = {
    title: "Careify - Trusted Baby Sitting & Elderly Care Services",
    description: "Careify provides reliable and trusted care services for children, elderly, and family members. Book professional caretakers for babysitting, elderly care, and special home care services easily and securely.",
    keywords: "baby sitting, elderly care, home care services, caretaker booking, child care, senior care, family care services, professional caretakers, trusted care provider",
    authors: [{ name: "Careify" }],
    openGraph: {
        title: "Careify - Trusted Baby Sitting & Elderly Care Services",
        description: "Find and hire reliable caretakers for babysitting, elderly care, and special care at home. Making caregiving easy, secure, and accessible for everyone.",
        type: "website",
        url: "https://careify.com",
        siteName: "Careify",
        images: [
            {
                width: 1200,
                height: 630,
                alt: "Careify - Professional Care Services"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Careify - Trusted Baby Sitting & Elderly Care Services",
        description: "Book professional caretakers for babysitting, elderly care, and home care services easily and securely.",
    },
    alternates: {
        canonical: "https://careify.com"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function Home() {
    return (
        <div className="my-5">
            <div>
                <Banner />
                <About />
                <OurService />
                <OurSuccess />
                <HowItWorks />
                <FAQ />
            </div>
        </div>
    );
}
