'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// TODO: Replace this with actual API call in the future
// This function simulates fetching device data from an API
const fetchDeviceData = async (id) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // TODO: Replace this with actual API data
  // This is mock data for demonstration purposes
  return {
    id: id,
    lastEmptied: '7/20/24',
    capacity: Math.floor(Math.random() * 100), // Random capacity for demonstration
    location: 'Harbor Bay',
    status: 'Active'
  };
};

export default function DevicePage() {
  // Get the device ID from the URL parameters
  const params = useParams();
  
  // State to store device data
  const [deviceData, setDeviceData] = useState(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to load device data
    const loadDeviceData = async () => {
      try {
        // Fetch data for the specific device
        const data = await fetchDeviceData(params.id);
        setDeviceData(data);
      } catch (error) {
        console.error('Failed to fetch device data:', error);
        // TODO: Implement proper error handling
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to load data
    loadDeviceData();
  }, [params.id]); // Re-run effect if device ID changes

  // Show loading state while fetching data
  if (isLoading) return <div className="text-white text-center mt-8">Loading device data...</div>;
  
  // Show error state if no data is fetched
  if (!deviceData) return <div className="text-white text-center mt-8">Device not found</div>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-8">
      {/* Back to Dashboard Link */}
      <Link href="/Dashboard" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Device Information Card */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Device {deviceData.id}</h2>
        <div className="space-y-4">
          {/* Capacity Section */}
          <div>
            <p className="text-sm text-gray-400">Capacity</p>
            <div className="flex items-center space-x-4">
              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${deviceData.capacity}%`}}
                ></div>
              </div>
              {/* Capacity percentage */}
              <span className="text-lg font-bold">{deviceData.capacity}%</span>
            </div>
          </div>

          {/* Last Emptied Section */}
          <div>
            <p className="text-sm text-gray-400">Last Emptied</p>
            <p className="text-lg">{deviceData.lastEmptied}</p>
          </div>

          {/* Location Section */}
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg">{deviceData.location}</p>
          </div>

          {/* Status Section */}
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-lg">{deviceData.status}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Request Emptying
      </button>
    </div>
  );
}