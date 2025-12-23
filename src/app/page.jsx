import Banner from "@/components/Banner";
import Image from "next/image";
import About from "./About/page";

export default function Home() {
    return (
        <div className="my-5">
            <div>
                <Banner />
                <About />
            </div>
        </div>
    );
}
