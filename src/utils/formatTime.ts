export const formatUnixTime = (ts: number, timeZone = "America/New_York") => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date(ts * 1000));
};

export const formatTimeAgo = (ts: number) => {
  const now = new Date();
  const diff = now.getTime() - ts * 1000;
  const diffInMinutes = diff / (1000 * 60);
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInDays = diff / (1000 * 60 * 60 * 24);
  const hours = Math.round(diffInHours);
  const days = Math.round(diffInDays);

  if (diffInMinutes < 1) {
    return "Just Now";
  } else if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes ago`;
  } else if (diffInHours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
};
