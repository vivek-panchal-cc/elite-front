export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
    public stack = ""
  ) {
    super(message);
    this.name = "ApiError";
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const handleError = (err: unknown) => {
  if (err instanceof ApiError) {
    return {
      status: err.statusCode,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };
  }

  // Default error
  return {
    status: 500,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      originalError: err instanceof Error ? err.message : "Unknown error",
    }),
  };
};

export const asyncHandler = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleError(error);
    }
  };
};
