'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

const fetchDeviceDetails = async (id) => {
  try {
    const response = await api.get(`/device/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching device details:', error);
    throw error;
  }
};

export default function DeviceDetailsPage() {
  const params = useParams();
  const [deviceData, setDeviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeviceData = async () => {
      try {
        const data = await fetchDeviceDetails(params.id);
        setDeviceData(data[0]); // Assuming the API returns an array with one item
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load device data');
        setIsLoading(false);
      }
    };

    loadDeviceData();
  }, [params.id]);

  if (isLoading) return <div className="text-white text-center mt-8">Loading device data...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!deviceData) return <div className="text-white text-center mt-8">Device not found</div>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-8">
      <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to Dashboard
      </Link>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
        <h2 className="text-2xl font-bold mb-4">Device {deviceData.id}</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Capacity</p>
            <div className="flex items-center space-x-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${deviceData.capacity}%`}}
                ></div>
              </div>
              <span className="text-lg font-bold whitespace-nowrap">{deviceData.capacity}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Emptied</p>
            <p className="text-lg">{deviceData.last_refill}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Location</p>
            <p className="text-lg">Longitude: {deviceData.longitude}, Latitude: {deviceData.latitude}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Region</p>
            <p className="text-lg">{deviceData.region}</p>
          </div>
        </div>
      </div>
    </div>
  );
}