import api from "../api";

const editPost = async (id: number | null, title: string, content: string): Promise<void> => {
    if (!id) {
        throw new Error("Post ID is required");
    }
    try {
        await api.put(`/blog/posts/edit/${id}`, {
            title,
            content,
        });
    } catch (error) {
        console.error("Error editing post:", error);
        throw error;
    }
}

export default editPost;