import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div>
            <Link href='/'><h1 className="text-2xl bg-linear-to-r from-[#89f7fe] to-[#66a6ff] bg-clip-text text-transparent font-bold cursor-pointer">Careify</h1></Link>
        </div>
    )
}

export default Logo
