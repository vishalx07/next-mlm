import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const switchInvalidCase = (message?: string): never => {
  throw new Error(
    message || "Unhandled or invalid case encountered in switch statement.",
  );
};
