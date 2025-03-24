import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
    id: string;
    username: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (accessToken: string, refreshToken: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get('access');
        const userData = Cookies.get('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (
        accessToken: string,
        refreshToken: string,
        userData: User
    ) => {
        Cookies.set('access', accessToken, { expires: 1 / 96 });
        Cookies.set('refresh', refreshToken, { expires: 1 });
        Cookies.set('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        Cookies.remove('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
