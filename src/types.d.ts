export interface Post {
    id: string;
    category: string;
    title: string;
    date: string;
    tags?: string[];
    content: string;
}
