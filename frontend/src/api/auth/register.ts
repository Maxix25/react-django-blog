import api from '../api';

const register = async (username: string, email: string, password: string) => {
    const response = await api.post('/blog/register/', {
        username,
        email,
        password,
    });
    return response;
};

export default register;
