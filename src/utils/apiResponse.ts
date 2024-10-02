class ApiResponse {
  statusCode: number;
  data: any;
  message: string | null;
  success: boolean;

  constructor(statusCode: number, data: any, message: string | null = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
