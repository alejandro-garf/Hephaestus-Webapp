'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// CustomProgress component defined inline
// This component creates a progress bar that changes color based on the value
const CustomProgress = React.forwardRef(({ value, className, ...props }, ref) => {
  // Function to determine the color based on the value
  const getColor = (value) => {
    if (value <= 30) return 'bg-green-500';
    if (value <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-700 ${className}`}
      {...props}
    >
      {/* The filled part of the progress bar */}
      <div
        className={`h-full w-full flex-1 transition-all ${getColor(value)}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
});

CustomProgress.displayName = "CustomProgress";

// TODO: Replace this with actual API call in the future
// This function simulates fetching device data from an API
const fetchDeviceData = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Return mock data
  return {
    id: id,
    lastEmptied: '7/20/24',
    capacity: Math.floor(Math.random() * 100),
    location: 'Harbor Bay',
    status: 'Active'
  };
};

export default function DevicePage() {
  const params = useParams();
  // State to store the device data
  const [deviceData, setDeviceData] = useState(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch device data when the component mounts or the ID changes
  useEffect(() => {
    const loadDeviceData = async () => {
      try {
        const data = await fetchDeviceData(params.id);
        setDeviceData(data);
      } catch (error) {
        console.error('Failed to fetch device data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeviceData();
  }, [params.id]);

  // Show loading state while fetching data
  if (isLoading) return <div className="text-white text-center mt-8">Loading device data...</div>;
  // Show error state if no data is fetched
  if (!deviceData) return <div className="text-white text-center mt-8">Device not found</div>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-8">
      {/* Back to Dashboard link */}
      <Link href="/dashboard" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </Link>
      {/* Main content card */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Device {deviceData.id}</h2>
        <div className="space-y-4">
          {/* Capacity section with color-changing progress bar */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Capacity</p>
            <div className="flex items-center space-x-4">
              <CustomProgress value={deviceData.capacity} className="flex-grow" />
              <span className="text-lg font-bold whitespace-nowrap">{deviceData.capacity}%</span>
            </div>
          </div>
          {/* Last Emptied section */}
          <div>
            <p className="text-sm text-gray-400">Last Emptied</p>
            <p className="text-lg">{deviceData.lastEmptied}</p>
          </div>
          {/* Location section */}
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg">{deviceData.location}</p>
          </div>
          {/* Status section */}
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-lg">{deviceData.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}