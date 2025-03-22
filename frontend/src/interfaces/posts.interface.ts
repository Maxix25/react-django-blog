export interface Post {
    postId: number;
    title: string;
    content: string;
    date_posted: string;
    author: {
        username: string;
    };
}
