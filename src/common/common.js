export function convertToIST(timestamp) {
    // Create a Date object with the given timestamp (US West time)
    const date = new Date(timestamp);
  
    // Convert to IST
    const options = {
      timeZone: "Asia/Kolkata", // IST Time Zone
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
  
    return date.toLocaleString("en-US", options);
  }