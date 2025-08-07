export interface LoginFormPayload {
  username: string;
  password: string;
  remember?: boolean | undefined;
}

export interface ApiResponse<T> {
  code: number;
  status: boolean;
  data: T;
  message: string;
}

export interface Response<T> {
  message: string;
  data: T;
}
export interface ErrorResponse {
  status: number;
  message: string;
  response?: {
    data?: {
      message?: string;
      errors?: { message?: string }[];
    };
  };
}
