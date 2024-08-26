import { dummyDashboardData } from './dummyData';

export const fetchDashboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Replace this with actual API call
  // const response = await fetch('/api/dashboard');
  // return response.json();

  // For now, return dummy data
  return dummyDashboardData;
};