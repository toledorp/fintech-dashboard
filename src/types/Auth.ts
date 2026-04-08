export interface AuthUser {
  name: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}
