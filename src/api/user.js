import axiosInstance from './axiosInstance';

export const updateUser = async (userId, userData) => {
  const response = await axiosInstance.put(`/user/${userId}`, userData);
  return response.data;
};

export const getUserProfile = async (email) => {
  const response = await axiosInstance.get(`/user/profile`, {params: {email: email}})
  return response.data
}
