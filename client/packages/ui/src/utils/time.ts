import dayjs from "dayjs";
import type { Timestamp } from "@repo/ui/types";

type InputValue = Date | string | number | null;

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "DD MMM YYYY hh:mm A";
  return date ? dayjs(new Date(date)).format(fm) : "_";
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || "DD MMM YYYY";
  return date ? dayjs(new Date(date)).format(fm) : "_";
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "hh:mm a";
  return date ? dayjs(new Date(date)).format(fm) : "_";
}

export const sleep = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const convertToMilliseconds = (
  value: number,
  unit: "second" | "minute" | "hour" | "day" | "week" | "month" | "year",
): number => {
  if (value <= 0) throw new Error(`${unit} must be a positive integer.`);

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  const unitMultipliers = {
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
  };

  return value * unitMultipliers[unit];
};

export const getFutureTime = (ms: number): Date => {
  return new Date(Date.now() + ms);
};

export const timestampToDate = (timestamp: Timestamp): Date => {
  // Convert the seconds part to milliseconds
  const milliseconds = Number(timestamp.seconds) * 1000;

  // Convert nanos part into a fraction of a millisecond
  const nanos = timestamp.nanos / 1000000; // 1 millisecond = 1,000,000 nanoseconds

  // Return the final Date object
  return new Date(milliseconds + nanos);
};
