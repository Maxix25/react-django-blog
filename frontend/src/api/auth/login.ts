import api from '../api';

const login = async (username: string, password: string) => {
    const response = await api.post('/api/token/', { username, password });
    return response.data;
};

export default login;
