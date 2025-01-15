import { Bounce, toast } from "react-toastify";

export const successToast = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export const infoToast = (message: string) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export const errorToast = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export const getPages = (currentPage: number, totalPages: number) => {
    const pages = [];
    const delta = 2; // Number of pages to show before and after the current page

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - delta - 1 || i === currentPage + delta + 1) &&
            totalPages > delta * 2 + 2
        ) {
            pages.push("...");
        }
    }
    return [...new Set(pages)]; // Remove duplicate dots
};

export const toTitleCase = (str: string) => {
    if (!str) return ""
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const validateEmail = (value: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        return "Email is required.";
    } else if (!emailRegex.test(value)) {
        return "Invalid email format.";
    }
    return "";
};

// Function to generate random colors
export const generateColorsAndDarkerVariants = (count: number) => {
    const colors = [];
    const darkerColors = [];

    // Generate `count` random colors and their darker variants
    for (let i = 0; i < count; i++) {
        const randomColor = getRandomColor();
        colors.push(randomColor);
        darkerColors.push(getDarkerColor(randomColor));
    }

    return { colors, darkerColors };
}

// Function to generate a random HEX color
const getRandomColor = () => {
    const randomHex = () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, "0"); // Generate two-digit hex values
    return `#${randomHex()}${randomHex()}${randomHex()}`;
}

// Function to darken a HEX color
const getDarkerColor = (hex: any, factor = 0.7) => {
    // Convert HEX to RGB
    const bigint = parseInt(hex.slice(1), 16);
    const r = Math.floor(((bigint >> 16) & 255) * factor);
    const g = Math.floor(((bigint >> 8) & 255) * factor);
    const b = Math.floor((bigint & 255) * factor);

    // Convert RGB back to HEX
    return `#${[r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")}`;
}

export function getRandomColorWithAlpha() {
    // Generate a random hex color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Convert the hex color to an RGBA format with alpha 0.1
    const rgbaColor = hexToRgba(randomColor, 0.1);

    return {
        color: randomColor,
        rgbaColor: rgbaColor
    };
}

// Function to convert hex color to RGBA
function hexToRgba(hex: any, alpha: any) {
    // Remove the '#' if it's present
    hex = hex.replace('#', '');

    // Extract the red, green, blue components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the RGBA format string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}