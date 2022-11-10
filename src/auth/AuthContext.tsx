import {createContext, PropsWithChildren, useState} from 'react';
import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { API_URL } from '@env'; 
import { Auth, AuthResponse, AuthContextType, LoginData } from '../helpers/types';

const AuthContext = createContext<AuthContextType>(null);
const {Provider} = AuthContext;

const AuthProvider = ({children} : PropsWithChildren) => {
    const [authState, setAuthState] = useState<Auth>({
        user: null,
        authenticated: null,
    });

    const authAxios = axios.create({
        baseURL: API_URL,
    });

    authAxios.interceptors.request.use(
        config => config,
        error => {
            return Promise.reject(error);
        }
    );

    const refreshAuthLogic = async() => {
        return authAxios
            .post<AuthResponse>('/auth/refresh')
            .catch(() => {
                setAuthState({
                    authenticated: false,
                    user: null
                });
                return logout();
            });
    }

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {
        statusCodes: [401]
    });

    const logout = async() => {
        return authAxios
            .post<AuthResponse>('/auth/logout')
            .then(() => {
                setAuthState({
                    authenticated: false,
                    user: null
                });
            });
    }

    const login = async(data: LoginData) => {
        return authAxios
            .post<AuthResponse>('/auth/login', data)
            .then(response => {
                setAuthState({
                    authenticated: true,
                    user: response.data.user
                });
                return response;
            })
            .catch((error: AxiosError) => {
                setAuthState({
                    authenticated: false,
                    user: null
                });
                throw error;
            });
    }

    return (
        <Provider
            value={{
                axios: authAxios,
                logout,
                login,
                authState
            }}>
            {children}
        </Provider>
    );
}

export { AuthContext, AuthProvider };