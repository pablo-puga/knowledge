export interface Post {
    id: string;
    title: string;
    date: Date;
    tags?: string[];
    content: string;
}