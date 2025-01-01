export const fetchUserIP = async () => {
    try {
      const response = await fetch("https://checkip.amazonaws.com");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ip = (await response.text()).trim(); // The service returns plain text
      return ip;
    } catch (error) {
      console.error("Failed to fetch IPv4 address:", error.message);
      return null;
    }
  }; 