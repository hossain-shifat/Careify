import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import Logo from "./Logo"

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                    <div className="text-center md:text-left">
                        <Logo />
                    </div>
                    <nav className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/about" className="link link-hover">About</Link>
                        <Link href="/projects" className="link link-hover">Projects</Link>
                        <Link href="/blog" className="link link-hover">Blog</Link>
                        <Link href="/contact" className="link link-hover">Contact</Link>
                    </nav>
                    <div className="flex gap-4 *:cursor-pointer">
                        <Github/>
                        <Twitter/>
                        <Linkedin/>
                    </div>
                </div>
                <div className="divider my-6" />
                <div className="text-center text-sm opacity-70">Copyright © {new Date().getFullYear()} - All right reserved by Careify</div>
            </div>
        </footer>
    )
}

export default Footer
