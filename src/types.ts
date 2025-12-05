export interface BlogPost {
    id: string;
    body?: string;
    collection: string;
    data: {
        title: string;
        description: string;
        pubDate: Date;
        updatedDate?: Date;
        heroImage?: any; // Astro image object
        prompt?: string;
        model?: string;
        author?: string;
        views?: number;
        tags?: string[];
        tips?: string[];
    };
}

export type Category = string;
