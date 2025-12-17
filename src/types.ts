export interface BlogPost {
    id: string;
    body?: string;
    collection: string;
    data: {
        title: string;
        description: string;
        category: string;
        pubDate: Date;
        updatedDate?: Date;
        heroImage?: any; // Astro image object
        prompt?: string;
        model?: string;
        author?: string;
        tags?: string[];
        tips?: string[];
    };
}

export type CategorySlug =
    | 'writing-copy'
    | 'coding'
    | 'image-generation'
    | 'productivity'
    | 'marketing'
    | 'business'
    | 'education'
    | 'entertainment';

export type Category = CategorySlug | 'All';
