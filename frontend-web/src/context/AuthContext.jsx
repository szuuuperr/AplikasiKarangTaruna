import { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('tukangkita_token'));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('tukangkita_user');
        return saved ? JSON.parse(saved) : null;
    });

    const isLoggedIn = !!token;

    const login = async (email, password) => {
        const { data } = await authAPI.login({ email, password });
        localStorage.setItem('tukangkita_token', data.token);
        localStorage.setItem('tukangkita_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const register = async (fullname, email, password) => {
        const { data } = await authAPI.register({ fullname, email, password });
        localStorage.setItem('tukangkita_token', data.token);
        localStorage.setItem('tukangkita_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('tukangkita_token');
        localStorage.removeItem('tukangkita_user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
