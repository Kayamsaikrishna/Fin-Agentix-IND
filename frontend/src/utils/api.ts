
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const initiateAadhaar = async (aadhaar_number: string) => {
  const response = await axios.post(`${API_URL}/kyc/initiate`, { aadhaar_number });
  return response.data;
};

export const verifyAadhaar = async (otp: string, reference_id: string) => {
  const response = await axios.post(`${API_URL}/kyc/verify`, { otp, reference_id });
  return response.data;
};
