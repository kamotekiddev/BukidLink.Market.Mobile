import { client } from "./client";

interface LoginDetails {
    email: string;
    password: string;
}

interface RegisterDetails extends LoginDetails {
    name: string;
    role: "Farmer" | "User";
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export const login = (data: LoginDetails) =>
    client.post<AuthResponse>("/auth/login", data);

export const register = (data: RegisterDetails) =>
    client.post<AuthResponse>("/auth/register", data);
