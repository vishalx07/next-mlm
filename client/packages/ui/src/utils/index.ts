import { unstable_cache } from "next/cache";
import { ConnectError } from "@connectrpc/connect";
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

export const getErrorMessage = (err: unknown): string => {
  const unknownError = "Something went wrong";
  if (err instanceof ConnectError) {
    return err.message ?? unknownError;
  } else if (err instanceof Error) {
    return err.message ?? unknownError;
  } else {
    return unknownError;
  }
};

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export const fetchData = async <T>(
  fn: () => Promise<T>,
  options?: {
    tags: string[];
    revalidate: number;
  },
): Promise<Result<T>> => {
  try {
    const { tags = [], revalidate = 300 } = options ?? {};
    const cachedFetch = unstable_cache(async () => fn(), tags, {
      revalidate,
      tags,
    });
    const data = tags.length > 0 ? await cachedFetch() : await fn();
    return { success: true, data };
  } catch (err) {
    const error = getErrorMessage(err);
    return { success: false, error: error };
  }
};
