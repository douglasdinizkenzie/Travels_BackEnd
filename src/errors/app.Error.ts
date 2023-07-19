class AppError extends Error {
  //   public readonly message: string;
  public readonly statusCode: number;

  constructor(message: any, statusCode: number) {
    // this.message = message;
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
