import { client } from "./client";

interface LoginDetails {
    email: string;
    password: string;
}

interface RegisterDetails extends LoginDetails {
    name: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export const login = (data: LoginDetails) =>
    client.post<AuthResponse>("/auth/login", data);

export const register = (data: RegisterDetails) =>
    client.post<AuthResponse>("/auth/register", data);

export const refresh = (refreshToken: string) =>
    client.post<AuthResponse>("/auth/refresh", { refreshToken });
