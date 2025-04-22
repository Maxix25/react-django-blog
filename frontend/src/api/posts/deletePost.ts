import api from '../api';

const deletePost = async (postId: number) => {
    try {
        const response = await api.delete(`/blog/posts/delete/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export default deletePost;
