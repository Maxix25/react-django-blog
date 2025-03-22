import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie';
const createPost = async (
    event: React.FormEvent<HTMLFormElement>,
    navigate: NavigateFunction
) => {
    event.preventDefault();
    const access = Cookies.get('access');
    let decoded: { user_id: string } | null = null;
    if (access) {
        decoded = jwtDecode<{ user_id: string }>(access);
    } else {
        console.error('Access token is undefined');
    }
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const post = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        author: decoded ? decoded.user_id : '',
    };
    try {
        const response = await api.post('/blog/posts/create/', post);
        console.log(response.data);
        navigate('/');
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
};
export default createPost;
