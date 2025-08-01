
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
  msg: string;
  data: T;
}
export interface ErrorResponse {
  status: number;
  message: string;
  response?: {
    data?: {
      msg?: string;
      errors?: { msg?: string }[];
    };
  };
}
