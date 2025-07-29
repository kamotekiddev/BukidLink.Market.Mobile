import { client } from "./client";

interface AuthCredentials {
    email: string;
    password: string;
}

export const login = (data: AuthCredentials) =>
    client.post("/auth/login", data);
