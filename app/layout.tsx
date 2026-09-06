import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
variable: "--font-inter",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "OmniSupport AI - CRM-Assistant.",
description: "fastest web interation CRM chatbot for many businesses",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
    <body
    className={`${inter.variable} bg-[#050509] min-h-screen flex flex-col p-0 antialiased text-zinc-100 selection:bg-zinc-800 font-sans`}
    >
    {/* Ambient background — modern purple/blue glow, drifts on its own and follows the cursor. Transform+opacity only, cheap on GPU */}
    <div
        id="bg-glow-wrap"
        className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#050509]"
    >
        <div id="cursor-glow" className="absolute w-[600px] h-[600px] rounded-full bg-glow-cursor" />
        <div className="absolute -top-32 left-[15%] w-[500px] h-[500px] rounded-full bg-glow-a animate-drift-a" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-glow-b animate-drift-b" />

        {/* Very subtle grid lines for depth */}
        <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
            backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
        }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#050509] via-transparent to-[#050509]/70" />
    </div>

    <Script
        id="cursor-glow-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `(function(){
            var glow = document.getElementById('cursor-glow');
            if(!glow) return;
            var x = window.innerWidth / 2, y = window.innerHeight / 2;
            var tx = x, ty = y;
            window.addEventListener('pointermove', function(e){ tx = e.clientX; ty = e.clientY; }, { passive: true });
            function loop(){
            x += (tx - x) * 0.06;
            y += (ty - y) * 0.06;
            glow.style.transform = 'translate3d(' + (x - 300) + 'px,' + (y - 300) + 'px,0)';
            requestAnimationFrame(loop);
            }
            requestAnimationFrame(loop);
        })();`,
        }}
    />

    {children}
    </body>
</html>
);
}