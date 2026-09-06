import React from 'react'

const SocialProof = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-black/20">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-8">
                    Trusted by Modern Businesses and Product Teams
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity grayscale">
                    {/* Simple text logos for minimal feel */}
                    <span className="text-lg font-bold tracking-tight text-white">Nodus</span>
                    <span className="text-lg font-light tracking-tight text-white">Nexus</span>
                    <span className="text-lg font-bold tracking-tight text-white italic font-serif">Twiko</span>
                    <span className="text-lg font-light tracking-[0.2em] text-white">HORIZON</span>
                </div>
            </div>
        </section>
    )
}

export default SocialProof
