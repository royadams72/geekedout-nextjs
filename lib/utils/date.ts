export const formatDate = (isoString: string, withTime: boolean = false) => {
  // Parse the ISO string to a Date object
  const date = new Date(isoString);

  // Extract individual components with leading zeros
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date as day/month/year
  const formattedDate = `${day}/${month}/${year}`;

  // Optional: Format the time if needed
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  if (withTime) {
    return `${formattedDate} ${formattedTime}`;
  }
  return `${formattedDate}`;
};
