import { AxiosInstance, AxiosResponse } from "axios";
import { Option } from "../models/Option";
import { User } from "../models/User";

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

export type FormattedAnswer = boolean | string | Option | Option[];
export type FormattedAnswerGroup = Array<{question: Number, answer: FormattedAnswer}>;