import api from '../api';

const getPost = async (id: number | null) => {
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
