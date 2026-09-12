import Link from 'next/link'
import {isAuthorized} from '@/lib/isAuthorized';
import React from 'react'

const Navbar = async () => {
const user = await isAuthorized();

console.log(user);

return (
<nav className=" fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-white/5 bg-[#050509]/50">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center p-[2.5px] select-none">
    <div className="w-full h-full border-[1.5px] border-black rounded-[5px] flex items-center justify-center">
    <span className="text-[9px] font-black text-black tracking-tighter leading-none -ml-[0.5px]">
        Ox
    </span>
    </div>
</div>
            <span className="text-base font-semibold tracking-tight text-white/90">OmniSupport AI</span>
        </Link>

        <div className ="hidden md:flex items-center gap-8 text-sm font-light text-zinc/400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">Integration</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
            {
                user ? (
                    <div className="flex items-center gap-3">
                    <link href="/dashboard"
                    className="h-10 px-4 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-all flex items-center gap-2">Dashboard</link>
                    </div>
                ) : (
                <>
                    <Link href="/api/auth" 
                        className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Sign In</Link>
                    <Link href="/api/auth"
                    className="text-xs font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">Get Started</Link>
                </>
                )
            }
        </div>
    </div>
</nav>
)
}

export default Navbar
