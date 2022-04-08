export interface IPost {
    id: string;
    category: string;
    title: string;
    description?: string;
    date: string;
    lastUpdated?: string;
    tags?: string[];
    content: string;
}
