import { format } from "date-fns";
const formatIDR = (amount) => {
  const new_format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
  return new_format;
};
function showImage(event) {
  if (event.target.classList.contains("placeholder")) {
    event.target.classList.remove("placeholder");
  }
}
function formatTime(dateString) {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formatted = `${hour}:${minute}`;
  return formatted;
}
function formatDate(dateString) {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString);
  const today = /* @__PURE__ */ new Date();
  const diffInMs = today.getTime() - date.getTime();
  const diffInDays = diffInMs / (1e3 * 60 * 60 * 24);
  if (diffInDays <= 7) {
    return format(date, "EEE, HH:mm");
  } else {
    return format(date, "d MMM yyyy HH:mm");
  }
}
function formatTimeOnly(dateString) {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString);
  return format(date, "HH:mm");
}
function formatDateOnly(dateString) {
  if (!dateString) return "Invalid Date";
  const date = new Date(dateString);
  return format(date, "EEE, dd MMM yyy");
}
function getMonthName(monthNumber, format2 = null) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return format2 == "short" ? monthNamesShort[monthNumber - 1] || "Invalid month" : monthNames[monthNumber - 1] || "Invalid month";
}
export {
  formatDate as a,
  formatDateOnly as b,
  formatTime as c,
  formatTimeOnly as d,
  formatIDR as f,
  getMonthName as g,
  showImage as s
};
