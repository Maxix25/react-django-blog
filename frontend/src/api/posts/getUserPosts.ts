import api from '../api';
const getUserPosts = async () => {
    const response = await api.get('/blog/posts/your-posts');
    return response.data;
};

export default getUserPosts;
