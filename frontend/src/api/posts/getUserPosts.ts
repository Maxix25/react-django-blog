import api from '../api';
import { Post } from '../../interfaces/posts.interface';
const getUserPosts = async (): Promise<Post[]> => {
    const response = await api.get('/blog/posts/your-posts');
    return response.data;
};

export default getUserPosts;
