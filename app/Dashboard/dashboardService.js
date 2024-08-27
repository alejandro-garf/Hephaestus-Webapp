// app/dashboard/dashboardService.js

// This is dummy data. In a real application, you'd fetch this from an API.
const dummyDashboardData = {
  devices: [
    { id: '0027', lastEmptied: '7/20/24', capacity: 100 },
    { id: '0028', lastEmptied: '7/21/24', capacity: 90 },
    { id: '0029', lastEmptied: '7/22/24', capacity: 80 },
    { id: '0030', lastEmptied: '7/23/24', capacity: 70 },
    { id: '0031', lastEmptied: '7/24/24', capacity: 60 },
    { id: '0032', lastEmptied: '7/25/24', capacity: 50 },
    { id: '0033', lastEmptied: '7/26/24', capacity: 40 },
    { id: '0034', lastEmptied: '7/27/24', capacity: 30 },
    { id: '0035', lastEmptied: '7/28/24', capacity: 20 },
    { id: '0036', lastEmptied: '7/29/24', capacity: 10 },
  ],
  statusData: [
    { name: 'Active', value: 8 },
    { name: 'Full', value: 1 },
    { name: 'Offline', value: 1 },
  ],
  pieData: [
    { name: 'Full', value: 1 },
    { name: 'Not Full', value: 9 },
  ],
};

export const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In the future, replace this with actual API call
  // const response = await fetch('/api/dashboard');
  // return response.json();

  // For now, return dummy data
  return dummyDashboardData;
};