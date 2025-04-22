import api from '../api';
import { Post } from '../../interfaces/posts.interface';

const getPost = async (id: number | null): Promise<Post | null> => {
    if (!id) {
        return null;
    }
    try {
        const response = await api.get(`/blog/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
};

export default getPost;
