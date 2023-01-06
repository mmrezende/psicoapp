import { AxiosInstance, AxiosResponse } from "axios";
import { File } from "../models/File";
import { User } from "../models/User";

export enum QuestionType {
    BINARY = "BINARY",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    SINGLE_CHOICE = "SINGLE_CHOICE",
    TEXT = "TEXT"
}

export type Error = Array<string> | string;

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

export type Answer = boolean | number | number[] | string;

export type AnswerGroup = Map<Number,Answer>;

export type FormattedOption = {text?: string, image?: File}

export type FormattedAnswer = {question: Number, type: QuestionType, value: FormattedOption[]};