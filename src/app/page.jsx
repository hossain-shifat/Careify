import Banner from "@/components/Banner";
import Image from "next/image";
import About from "./About/page";
import OurSuccess from "./OurSuccess/page";
import OurService from "./OurService/page";
import HowItWorks from "./HowITWorks/page";

export default function Home() {
    return (
        <div className="my-5">
            <div>
                <Banner />
                <About />
                <OurService />
                <OurSuccess />
                <HowItWorks />
            </div>
        </div>
    );
}
