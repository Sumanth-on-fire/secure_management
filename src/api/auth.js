import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  return response.data;
};

export const updatePassword = async (userData) => {
  const response = await axiosInstance.post('/auth/updatepassword', userData)
  return response.data
}

export const logout = async (userData) => {
  const response =  await axiosInstance.post('/auth/logout', userData)
  return response.data
}