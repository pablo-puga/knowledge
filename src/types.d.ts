interface SerializablePost {
    id: string;
    category: string;
    title: string;
    date: string;
    tags: string[];
}
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

export type TagName = string;
export interface ITagData {
    count: number;
    color: string;
}

export type TagDataRegister = Record<TagName, ITagData>;

export type CategoryName = string;
export interface ICategoryData {
    color: string;
}

export type CategoryDataRegister = Record<CategoryName, ICategoryData>;
