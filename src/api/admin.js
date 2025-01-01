import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const updateUserRoleStatus = async (data) => {
  const response = await axiosInstance.put("/admin/user-role-status", data);
  return response.data;
};

export const exportLogs = async () => {
  try {
    const response = await axiosInstance.get("/admin/logs/export", {
      responseType: "blob", // Ensures the server returns a downloadable file
    });
    
    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Extract the filename from the response headers or use a default name
    const filename = response.headers["content-disposition"]
      ?.split("filename=")[1]
      ?.replace(/"/g, "") || "exported_logs.xlsx";

    a.download = filename;
    a.click();

    // Cleanup the object URL
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Failed to export logs:", error);
    throw error; // Propagate the error to the caller
  }
};

