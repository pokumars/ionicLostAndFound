export interface LoginResponse {
  message: string;
  token: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    time_created: string;
  }
}
