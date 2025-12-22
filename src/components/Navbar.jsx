'use client'
import { useTheme } from '@/hooks/useTheme'
import { Menu, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'

const Navbar = () => {

    const { theme, toggleTheme } = useTheme()

    const links =
        <>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/services">Services</Link>
            </li>
            <li>
                <Link href="/contact">Contact</Link>
            </li>
            <li>
                <Link href="/"></Link>
            </li>
        </>

    return (
        <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="px-3 lg:hidden">
                        <Menu />
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex gap-2">
                <div>
                    <button onClick={toggleTheme} className="btn btn-white hover:bg-base-content hover:border-none hover:outline-none btn-square">
                        {
                            theme === 'light'
                                ?
                                <Moon size={22} />
                                :
                                <Sun className="text-yellow-400" size={22} />
                        }
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-primary font-bold">Login</button>
                    <button className="btn btn-primary font-bold">Register</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
