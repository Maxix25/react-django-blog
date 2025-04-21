import api from '../api';
import { Post } from '../../interfaces/posts.interface';

const getAllPosts = async (): Promise<Post[]> => {
    try {
        const response = await api.get('/blog/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export default getAllPosts;
