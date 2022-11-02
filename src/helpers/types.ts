import { AxiosInstance, AxiosResponse } from "axios";
import { User } from "../models/User";

export type Error = Array<String> | string;

export type LoginData = {
    email: string;
    password: string;
}

export type Auth = {
    user?: User;
    authenticated: boolean;
}

export type AuthContextType = {
    authState: Auth,
    axios: AxiosInstance;
    login: (data: LoginData) => Promise<AxiosResponse<AuthResponse>>;
    logout: () => Promise<void>;
}

export type AuthResponse = {
    user: User
    token: string;
}