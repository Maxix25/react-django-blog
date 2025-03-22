import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ReactNode } from 'react';
import api from '../api/api';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth();
    }, []);

    const refreshToken = async () => {
        const refreshTokenValue = Cookies.get('refresh');
        if (!refreshTokenValue) {
            setIsAuthorized(false);
            return;
        }
        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshTokenValue,
            });
            const token = response.data.access;
            Cookies.set('access', token);
            setIsAuthorized(true);
        } catch (error) {
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = Cookies.get('access');
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        if (!tokenExpiration) {
            setIsAuthorized(false);
            return;
        }
        const now = Date.now() / 1000;
        if (now > tokenExpiration) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    return isAuthorized ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
