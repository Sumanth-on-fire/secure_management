import axiosInstance from './axiosInstance';

export const fetchActivityLogs = async () => {
    try {
      const response = await axiosInstance.get("/log/user", {
        params: { email: localStorage.getItem("email") },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
      throw error;
    }
  };

export const clearAllActivity = async () => {
    try{
        const response = await axiosInstance.get("/log/clearall", {
            params: {email: localStorage.getItem("email")},
        })
        return response;
    }
    catch(error){
        console.log("Failed to clear all the acitvity logs: ", error)
        throw error
    }
}

export const clearActivityById = async (id) => {
    try{
        const response = await axiosInstance.get("/log/clearlog", {
            params: {email: localStorage.getItem("email"), id: id},
        })
        return response;
    }
    catch(error){
        console.log("Failed to clear the log: ", error)
        throw error
    }
}

export const getUserActivityLogsByEmail = async (email) => {
    try {
      const response = await axiosInstance.get("/log/user_log", {
        params: { email: email },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
      throw error;
    }
  };