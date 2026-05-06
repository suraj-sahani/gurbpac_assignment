import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getImagePreviewUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
}

export const formatDateTime = (dateTime) =>
  new Date(dateTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
