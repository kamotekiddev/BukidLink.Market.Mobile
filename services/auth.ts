import { client } from "./client";

interface AuthCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export const login = (data: AuthCredentials) =>
    client.post<AuthResponse>("/auth/login", data);

export const refresh = (refreshToken: string) =>
    client.post<AuthResponse>("/auth/refresh", { refreshToken });
