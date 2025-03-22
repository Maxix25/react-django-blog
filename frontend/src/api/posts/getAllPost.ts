import api from '../api';

const getAllPosts = async () => {
    try {
        const response = await api.get('/blog/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

export default getAllPosts;
