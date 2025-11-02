import { format } from "date-fns";

export const formatIDR = (amount) => {
    const new_format = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
    return new_format;
};

export function showPassword(input_id, icon_id) {
    var password = document.getElementById(input_id);
    var password_icon = document.getElementById(icon_id);
    if (password.type === "password") {
        password.type = "text";
        password_icon.classList.remove("bi-eye-slash-fill");
        password_icon.classList.add("bi-eye-fill");
    } else {
        password.type = "password";
        password_icon.classList.remove("bi-eye-fill");
        password_icon.classList.add("bi-eye-slash-fill");
    }
}

export function showImage(event) {
    if (event.target.classList.contains("placeholder")) {
        event.target.classList.remove("placeholder");
    }
}

export function formatTime(dateString) {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatted = `${hour}:${minute}`;

    return formatted;
}

export function formatDate(dateString) {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);
    const today = new Date(); // Get today's date

    // Calculate the difference in milliseconds
    const diffInMs = today.getTime() - date.getTime();

    // Convert milliseconds to days (1 day = 1000ms * 60s * 60m * 24h)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (diffInDays <= 7) {
        return format(date, "EEE, HH:mm");
    } else {
        return format(date, "d MMM yyyy HH:mm");
    }
}

export function formatDateSimple(dateString) {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);

    return format(date, "EEE, dd MMM yy - HH:mm");
}

export function formatTimeOnly(dateString) {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);

    return format(date, "HH:mm");
}

export function formatDateOnly(dateString) {
    if (!dateString) return "Invalid Date";

    const date = new Date(dateString);

    return format(date, "EEE, dd MMM yyy");
}

export function getMonthName(monthNumber, format = null) {
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
        "December",
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
        "Dec",
    ];

    // Adjust for 1-based input (1 = Jan, 12 = Dec)
    return format == "short"
        ? monthNamesShort[monthNumber - 1] || "Invalid month"
        : monthNames[monthNumber - 1] || "Invalid month";
}
