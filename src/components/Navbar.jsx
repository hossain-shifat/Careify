'use client'
import { useTheme } from '@/hooks/useTheme'
import { Menu, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {

    const {theme, toggleTheme} = useTheme()
    const [menu, setMenu] = useState("home");


    const links =
        <>

        </>

    return (
        <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <Link href='/' className='px-3 text-2xl font-oleo bg-linear-to-r from-[#89f7fe] to-[#66a6ff] bg-clip-text text-transparent font-bold cursor-pointer'>Careify</Link>
            </div>
            {/* large screen view */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal *:px-2 *:cursor-pointer text-md font-montserrat">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <div className="md:px-5 flex justify-between items-center gap-15">
                    <button className="hidden md:block btn btn-accent btn-outline font-normal text-base-content hover:bg-transparent font-montserrat rounded-xl shadow-accent hover:shadow-2xl">Contact</button>
                    <button onClick={toggleTheme} className="btn btn-white btn-sm hover:bg-base-content hover:border-none hover:outline-none btn-square">
                        {
                            theme === 'light'
                                ?
                                <Moon size={22} />
                                :
                                <Sun className="text-yellow-400" size={22} />
                        }
                    </button>
                </div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="px-4 lg:hidden">
                        <Menu size={30} />
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm -left-35 gap-2 dropdown-content bg-base-200 rounded-box z-999 mt-3 w-52 p-2 shadow font-montserrat">
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
