import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t border-white/5 py-12 bg-black/40'>
            <div className='max-w-6xl mx-auto px-6 flex flex-col md_flex-row justify-between items-center gap-6'>
            <div className="flex items-center gap-2">
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
            </div>

            <div className="flex gap-8 text-sm font-light text-zinc-600">
                <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-zinc-400 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-zinc-400 transition-colors">Contact Us</Link>
            </div>

            <div className="text-sm text-zinc-700">© 2026 OmniSupport AI. All rights reserved.</div>

            </div>
        </footer>
    )
}

export default Footer
