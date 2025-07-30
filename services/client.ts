import axios from "axios";
import * as secureStore from "expo-secure-store";
import { API_URL } from "@env";

import { TokenType } from "../constants";
import { refresh } from "./auth";

export const client = axios.create({ baseURL: API_URL });

client.interceptors.request.use(async (config) => {
    const accessToken = await secureStore.getItemAsync(TokenType.ACCESS_TOKEN);

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 && originalRequest._retry)
            return Promise.reject();

        originalRequest._retry = true;

        try {
            const refreshToken = await secureStore.getItemAsync(
                TokenType.REFRESH_TOKEN
            );

            const {
                data: { accessToken },
            } = await refresh(refreshToken ?? "");

            await secureStore.setItemAsync(TokenType.ACCESS_TOKEN, accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return client(originalRequest);
        } catch (refreshError) {
            await secureStore.deleteItemAsync(TokenType.ACCESS_TOKEN);
            await secureStore.deleteItemAsync(TokenType.REFRESH_TOKEN);

            return Promise.reject(refreshError);
        }
    }
);
