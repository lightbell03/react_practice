export type ApiResponse<T> = {
  message: string;
  code: number;
  data: T
}

export type ApiErrorResponse = ApiResponse<null>