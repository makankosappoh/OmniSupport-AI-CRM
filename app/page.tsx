import Features from '@/components/ui/landing/features';
import Hero from '@/components/ui/landing/hero';
import Navbar from '@/components/ui/landing/nav';
import SocialProof from '@/components/ui/landing/social';
import React from 'react';

const page = () => {
  return (
    <main className="w-full flex flex-col relative z-10">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
    </main>
  );
}

export default page;