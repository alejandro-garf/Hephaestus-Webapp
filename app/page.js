'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-container flex items-center justify-between h-screen bg-blue-900 text-white">
      <div className="text-section w-1/2 p-8">
        <h1 className="text-5xl font-bold mb-4">River Pollution Automation Solutions</h1>
        <p className="text-lg mb-8">Don't reinvent the wheel, refine it</p>
        <Link href="/signin">
          <button className="sign-in-btn text-white px-6 py-3 rounded-full text-lg font-bold">
            SIGN IN
          </button>
        </Link>
      </div>
      <div className="image-section w-1/2 flex justify-center items-center">
        <img src="/logo.png" alt="Hephaestus Logo" className="w-1/2" />
      </div>
    </div>
  );
}
