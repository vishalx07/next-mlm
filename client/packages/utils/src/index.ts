export const switchInvalidCase = (message?: string): never => {
  throw new Error(
    message || "Unhandled or invalid case encountered in switch statement.",
  );
};
