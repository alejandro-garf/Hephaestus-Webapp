'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchDashboardData } from './dashboardService';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const COLORS = ['#FF6B6B', '#4ECDC4'];

  if (isLoading) return <div className="text-white text-center mt-8">Loading dashboard data...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!dashboardData) return null;

  const { devices, statusData, pieData } = dashboardData;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statusData.map((item) => (
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
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id} className="border-b border-gray-700">
                  <td className="p-2">{device.id}</td>
                  <td className="p-2">{device.lastEmptied}</td>
                  <td className="p-2">{device.capacity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={devices}
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
    </div>
  );
}