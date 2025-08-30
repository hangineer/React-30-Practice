export const formatTime = (date) => {
  return Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false, // show as 24 hours
    minute: "numeric",
  }).format(date);
};
