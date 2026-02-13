import React, { createContext, useContext, useState } from 'react';
import { authAPI, setToken } from '../services/api';

type User = { id: string; fullname: string; email: string };
type AuthCtx = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (fullname: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const isLoggedIn = !!user;

    const login = async (email: string, password: string) => {
        const { data } = await authAPI.login({ email, password });
        setToken(data.token);
        setUser(data.user);
    };

    const register = async (fullname: string, email: string, password: string) => {
        const { data } = await authAPI.register({ fullname, email, password });
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
