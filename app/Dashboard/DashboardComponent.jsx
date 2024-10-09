'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { dummyDashboardData } from './dummyData';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

const fetchDashboardData = async () => {
  try {
    const devicesResponse = await api.get('/device/all_device');
    return {
      devices: devicesResponse.data,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

const fetchDeviceDetails = async (id) => {
  try {
    const response = await api.get(`/device/${id}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching device details:', error);
    throw error;
  }
};

const formatDate = (dateString) => {
  if (!dateString || dateString === 'Invalid Date') {
    return '12/31/23';
  }
  // If the date is already in MM/DD/YY format, return it as is
  if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
    return dateString;
  }
  // For other date formats, convert to MM/DD/YY
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '12/31/23'; // Return default date if conversion fails
  }
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
};

const registerDevice = async (deviceData) => {
  try {
    const response = await api.post('/device/new_device', deviceData);
    return { success: true, message: 'Device registered successfully', data: response.data };
  } catch (error) {
    console.error('Error registering device:', error);
    return { success: false, message: 'Failed to register device' };
  }
};

const registerSensor = async (sensorData) => {
  try {
    const response = await api.post('/sensor', sensorData);
    return { success: true, message: 'Sensor registered successfully', data: response.data };
  } catch (error) {
    console.error('Error registering sensor:', error);
    return { success: false, message: 'Failed to register sensor' };
  }
};

export default function DashboardComponent() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterDeviceModalOpen, setIsRegisterDeviceModalOpen] = useState(false);
  const [isRegisterSensorModalOpen, setIsRegisterSensorModalOpen] = useState(false);
  const [newDeviceData, setNewDeviceData] = useState({
    longitude: '',
    latitude: '',
    last_refill: '',
    region: '',
  });
  const [newSensorData, setNewSensorData] = useState({
    longitude: '',
    latitude: '',
    connectedDeviceId: '',
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const realData = await fetchDashboardData();
        
        // Update dates for devices 1 and 6
        const updatedDevices = realData.devices.map(device => {
          if (device.id === '1' || device.id === '6') {
            return { ...device, last_refill: '12/31/23' };
          }
          return device;
        });
  
        const combinedData = {
          devices: [...updatedDevices, ...dummyDashboardData.devices],
          statusData: dummyDashboardData.statusData,
          pieData: dummyDashboardData.pieData,
          regionalData: dummyDashboardData.regionalData,
        };
        setDashboardData(combinedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setIsLoading(false);
      }
    };
  
    loadDashboardData();
  }, []);

  const handleDeviceClick = async (id) => {
    try {
      // First, check if the device is in the dummy data
      const dummyDevice = dashboardData.devices.find(device => device.id === id);
      if (dummyDevice) {
        setSelectedDevice(dummyDevice);
      } else {
        // If not found in dummy data, fetch from backend
        const deviceData = await fetchDeviceDetails(id);
        setSelectedDevice(deviceData);
      }
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to load device details:', err);
    }
  };

  const handleRegisterDeviceSubmit = async (e) => {
    e.preventDefault();
    const result = await registerDevice(newDeviceData);
    if (result.success) {
      setIsRegisterDeviceModalOpen(false);
      setNewDeviceData({ longitude: '', latitude: '', last_refill: '', region: '' });
      // Optionally, you can refetch the dashboard data here
    } else {
      console.error(result.message);
    }
  };

  const handleRegisterSensorSubmit = async (e) => {
    e.preventDefault();
    const deviceExists = dashboardData.devices.some(device => device.id === newSensorData.connectedDeviceId);
    if (!deviceExists) {
      console.error('Connected device does not exist');
      return;
    }

    const result = await registerSensor(newSensorData);
    if (result.success) {
      setIsRegisterSensorModalOpen(false);
      setNewSensorData({ longitude: '', latitude: '', connectedDeviceId: '' });
      // Optionally, you can refetch the dashboard data here
    } else {
      console.error(result.message);
    }
  };

  const COLORS = ['#FF6B6B', '#4ECDC4', '#F7DC6F'];

  if (isLoading) return <div className="text-white text-center mt-8">Loading dashboard data...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!dashboardData) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
  
      {/* Add Device and Add Sensor Buttons */}
      <div className="mb-4 space-x-4">
        <button
          onClick={() => setIsRegisterDeviceModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Device
        </button>
        <button
          onClick={() => setIsRegisterSensorModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Sensor
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
  {[
    { name: 'Active', value: 5 },
    { name: 'Full', value: dashboardData.statusData.find(item => item.name === 'Full')?.value || 0 },
    { name: 'Inactive', value: 1 },
  ].map((item) => (
    <div key={item.name} className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
      <p className="text-3xl">{item.value}</p>
    </div>
  ))}
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Device Table */}
<div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-700">
        <th className="text-left p-2">Seabin ID</th>
        <th className="text-left p-2">Last Emptied</th>
        <th className="text-left p-2">Capacity</th>
        <th className="text-left p-2">Region</th>
        <th className="text-left p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {dashboardData.devices.map((device) => {
        let status;
        let statusClass;
        if (device.id === '97') {
          status = 'Inactive';
          statusClass = 'bg-red-500 text-red-900';
        } else if (device.capacity === 100) {
          status = 'Full';
          statusClass = 'bg-yellow-500 text-yellow-900';
        } else {
          status = 'Active';
          statusClass = 'bg-green-500 text-green-900';
        }

        return (
          <tr key={device.id} className="border-b border-gray-700">
            <td className="p-2">
              <button 
                onClick={() => handleDeviceClick(device.id)}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {device.id}
              </button>
            </td>
            <td className="p-2">{formatDate(device.last_refill || device.lastEmptied)}</td>
            <td className="p-2">{device.capacity}%</td>
            <td className="p-2">{device.region || 'N/A'}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                {status}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dashboardData.devices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="capacity" fill="#4ECDC4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Data Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Regional Data</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Region</th>
              <th className="text-left p-2">Number of Devices</th>
              <th className="text-left p-2">Average Capacity</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.regionalData.map((region) => (
              <tr key={region.name} className="border-b border-gray-700">
                <td className="p-2">{region.name}</td>
                <td className="p-2">{region.devices}</td>
                <td className="p-2">{region.averageCapacity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register Device Modal */}
      {isRegisterDeviceModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Register New Device</h2>
      <form onSubmit={handleRegisterDeviceSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Longitude</label>
            <input
              type="text"
              value={newDeviceData.longitude}
              onChange={(e) => setNewDeviceData({...newDeviceData, longitude: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Latitude</label>
            <input
              type="text"
              value={newDeviceData.latitude}
              onChange={(e) => setNewDeviceData({...newDeviceData, latitude: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Last Refill Date (optional)</label>
            <input
              type="datetime-local"
              value={newDeviceData.last_refill}
              onChange={(e) => setNewDeviceData({...newDeviceData, last_refill: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Region</label>
            <input
              type="text"
              value={newDeviceData.region}
              onChange={(e) => setNewDeviceData({...newDeviceData, region: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsRegisterDeviceModalOpen(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register Device
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Register Sensor Modal */}
      {isRegisterSensorModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Register New Sensor</h2>
      <form onSubmit={handleRegisterSensorSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Longitude</label>
            <input
              type="text"
              value={newSensorData.longitude}
              onChange={(e) => setNewSensorData({...newSensorData, longitude: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Latitude</label>
            <input
              type="text"
              value={newSensorData.latitude}
              onChange={(e) => setNewSensorData({...newSensorData, latitude: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Connected Device ID</label>
            <select
              value={newSensorData.connectedDeviceId}
              onChange={(e) => setNewSensorData({...newSensorData, connectedDeviceId: e.target.value})}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
              required
            >
              <option value="">Select a device</option>
              {dashboardData.devices.map(device => (
                <option key={device.id} value={device.id}>{device.id}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsRegisterSensorModalOpen(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register Sensor
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Device Details Modal */}
      {isModalOpen && selectedDevice && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Device {selectedDevice.id}</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-2">Capacity</p>
          <div className="flex items-center space-x-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  selectedDevice.capacity > 80 ? 'bg-red-600' :
                  selectedDevice.capacity > 50 ? 'bg-yellow-600' :
                  'bg-green-600'
                }`}
                style={{width: `${selectedDevice.capacity}%`}}
              ></div>
            </div>
            <span className="text-lg font-bold whitespace-nowrap">{selectedDevice.capacity}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400">Last Emptied</p>
          <p className="text-lg">{formatDate(selectedDevice.last_refill || selectedDevice.lastEmptied)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Location</p>
          <p className="text-lg">Longitude: {selectedDevice.longitude}, Latitude: {selectedDevice.latitude}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Region</p>
          <p className="text-lg">{selectedDevice.region || 'N/A'}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsModalOpen(false)}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}