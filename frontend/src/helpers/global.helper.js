export const convertTimestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  date.setHours(date.getUTCHours() + 1);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);

  // Format the date to DD-MM-YYYY
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
  return formattedDate;
};
