'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserAuth } from "./context/AuthContext";

// Update this constant to match the route in your Navbar
const Dashboard_ROUTE = '/Dashboard';

export default function HomePage() {
  const { user, googleSignIn } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      // Redirect to Dashbaord page after successful sign-in
      router.push(Dashboard_ROUTE);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="home-container flex items-center justify-between h-screen bg-blue-900 text-white">
      <div className="text-section w-1/2 p-8">
        <h1 className="text-5xl font-bold mb-4">River Pollution Automation Solutions</h1>
        <p className="text-lg mb-8">Don't reinvent the wheel, refine it</p>
        {!user ? (
          <button 
            onClick={handleSignIn}
            className="sign-in-btn text-white px-6 py-3 rounded-full text-lg font-bold bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            SIGN IN
          </button>
        ) : (
          <Link href={Dashboard_ROUTE}>
            <button className="Dashboard-btn text-white px-6 py-3 rounded-full text-lg font-bold bg-green-600 hover:bg-green-700 transition duration-300">
              Dashboard
            </button>
          </Link>
        )}
      </div>
      <div className="image-section w-1/2 flex justify-center items-center">
        <img src="/logo.png" alt="Hephaestus Logo" className="w-1/2" />
      </div>
    </div>
  );
}