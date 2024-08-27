'use client'; 

import React from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import { UserAuth } from "./context/AuthContext"; 
import VideoCarousel from './Components/Carousel'; 

const Dashboard_ROUTE = '/Dashboard'; // Constant for the Dashboard route

export default function HomePage() {
  const { user, googleSignIn } = UserAuth(); 
  const router = useRouter(); // Initialize useRouter for navigation

  // Function to handle Google sign-in
  const handleSignIn = async () => {
    try {
      await googleSignIn(); 
      router.push(Dashboard_ROUTE); // Redirect to Dashboard on successful sign-in
    } catch (error) {
      console.error("Error signing in:", error); 
    }
  };

  // Array of video sources for the carousel
  const carouselVideos = [
    '/video1.mp4',
    '/video2.mp4',
    '/video3.mp4',
    '/video4.mp4',
  ];

  return (
    <div className="flex flex-col">
      {/* Full-screen video carousel */}
      <div className="h-screen">
        <VideoCarousel videos={carouselVideos} />
      </div>
      
      {/* Home container section with sign-in and dashboard options */}
      <div className="home-container flex items-center justify-between bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-16">
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

      {/* Product Information Section with extended gradient */}
      <div className="product-info flex items-center justify-between bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white py-16 px-10">
        <div className="info-text w-2/3 pr-8">
          <h2 className="text-3xl font-bold mb-4">Our Product</h2>
          <p className="text-lg">
            River Pollution Automation Solutions offers cutting-edge technology to monitor and manage river pollution. 
            Our innovative system uses advanced sensors and AI-driven analytics to provide real-time data on water quality, 
            helping environmental agencies and local authorities to take timely action. With our solution, we aim to 
            preserve our water resources and protect aquatic ecosystems for future generations.
          </p>
        </div>
        <div className="logo-section w-1/3 flex justify-center items-center">
          <img src="/logo2.png" alt="Hephaestus Logo" className="w-3/4" />
        </div>
      </div>
    </div>
  );
}
