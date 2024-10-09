export const dummyDashboardData = {
  devices: [
    { id: '10', lastEmptied: '8/1/24', capacity: 95, region: 'North', status: 'Active' },
    { id: '17', lastEmptied: '8/2/24', capacity: 100, region: 'South', status: 'Active' },
    { id: '43', lastEmptied: '8/3/24', capacity: 100, region: 'East', status: 'Full' },
    { id: '66', lastEmptied: '8/4/24', capacity: 75, region: 'West', status: 'Active' },
    { id: '97', lastEmptied: '8/5/24', capacity: 0, region: 'Central', status: 'Offline' },
    // ... add more dummy devices as needed
  ],
  statusData: [
    { name: 'Active', value: 12 },
    { name: 'Full', value: 2 },
    { name: 'Offline', value: 1 },
  ],
  pieData: [
    { name: 'Full', value: 2 },
    { name: 'Not Full', value: 12 },
    { name: 'Offline', value: 1 },
  ],
  regionalData: [
    { name: 'North', devices: 3, averageCapacity: 80 },
    { name: 'South', devices: 4, averageCapacity: 75 },
    { name: 'East', devices: 3, averageCapacity: 90 },
    { name: 'West', devices: 3, averageCapacity: 70 },
    { name: 'Central', devices: 2, averageCapacity: 50 },
  ],
};