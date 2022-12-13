import axios from "axios";

export default class ServiceError extends Error {
  public readonly errorMessage: string;
  public readonly errorCode: string;
  public readonly status: number;

  constructor(action: string, error: any) {
    if (
      !axios.isAxiosError(error) ||
      error.response === undefined ||
      error.response.data === undefined ||
      error.response.status === undefined
    ) {
      console.log(error);
      super("Unknown error service error");
      this.errorMessage = "Unknown error";
      this.errorCode = "UNKNOWN_ERROR";
      this.status = 500;
      return;
    }

    const data = error.response.data as { message: string; errorCode: string };
    const status = error.response.status;

    super(`[${action}] -> ${JSON.stringify({ status, message: data.message, errorCode: data.errorCode })}`);

    this.errorMessage = data.message;
    this.errorCode = data.errorCode;
    this.status = status;
  }
}
