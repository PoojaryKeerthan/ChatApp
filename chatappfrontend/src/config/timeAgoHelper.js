export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  const units = [
    { label: "year",   seconds: 31536000 },
    { label: "month",  seconds: 2592000 },
    { label: "day",    seconds: 86400 },
    { label: "hour",   seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  for (let unit of units) {
    const interval = Math.floor(seconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return "just now";
}
