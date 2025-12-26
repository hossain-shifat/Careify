"use client";
import { useTheme } from '@/hooks/useTheme';
import { Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const links = (
        <>
            <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link href="/services" className={pathname === '/services' ? 'active' : ''}>Services</Link></li>
            <li><Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link></li>

            {
                session &&
                <>
                    <li><Link href="/my-bookings" className={pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link></li>
                </>
            }
        </>
    )

    return (
        <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50 md:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="px-3 lg:hidden">
                        <Menu className={theme === 'light' ? 'text-black' : 'text-white'} />
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
                                <Moon size={22} stroke='black' />
                                :
                                <Sun className="text-yellow-400" size={22} />
                        }
                    </button>
                </div>

                {status === "loading" ? (
                    ''
                ) : session ? (
                    <div>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-error btn-outline text-error">Logout</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="btn btn-accent font-bold text-white">
                            Login
                        </Link>
                        <Link href="/register" className="btn btn-accent font-bold text-white">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
