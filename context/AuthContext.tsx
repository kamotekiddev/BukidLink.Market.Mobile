import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { TokenType } from "../constants";

interface Credentials {
    accessToken: string;
    refreshToken: string;
}

interface AuthContextState {
    isAuthenticated: boolean;
    login: (credentials: Credentials) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextState | null>(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = async ({ accessToken, refreshToken }: Credentials) => {
        try {
            setIsLoading(true);
            await SecureStore.setItemAsync(TokenType.ACCESS_TOKEN, accessToken);
            await SecureStore.setItemAsync(
                TokenType.REFRESH_TOKEN,
                refreshToken
            );
            setIsAuthenticated(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            setIsAuthenticated(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            setIsLoading(true);

            const token = await SecureStore.getItemAsync(
                TokenType.ACCESS_TOKEN
            );

            setIsLoading(false);
            if (token) return setIsAuthenticated(true);
            return setIsAuthenticated(false);
        };

        loadToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = (): AuthContextState => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error(
            "useAuthContext must be used within an AuthContextProvider"
        );

    return context;
};
