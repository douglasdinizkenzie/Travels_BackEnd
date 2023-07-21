class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
