class ApiError extends Error {
  statusCode: number;
  errors: any;
  message: string;
  stack: string | undefined;

  constructor(
    statusCode: number,
    errors: any,
    message = "Error Occured",
    stack: string | undefined,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;