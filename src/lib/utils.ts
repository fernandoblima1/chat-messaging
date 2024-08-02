import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFallbackColor = (id: number) => {
  const colors = [
    "bg-blue-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-gray-200",
  ];
  return colors[id % colors.length];
};
