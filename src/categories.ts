// Central category configuration for the blog
// This defines all available categories with their metadata

export interface CategoryDefinition {
    slug: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name
    color: string; // Color theme for visual distinction
}

export const CATEGORIES: CategoryDefinition[] = [
    {
        slug: 'writing-copy',
        name: 'Writing & Copy',
        description: 'Prompts for content creation, copywriting, and creative writing',
        icon: 'pen-tool',
        color: 'purple'
    },
    {
        slug: 'coding',
        name: 'Coding',
        description: 'Programming prompts, code generation, and development assistance',
        icon: 'code',
        color: 'blue'
    },
    {
        slug: 'image-generation',
        name: 'Image Gen',
        description: 'AI image generation prompts for Midjourney, DALL-E, and Stable Diffusion',
        icon: 'image',
        color: 'pink'
    },
    {
        slug: 'productivity',
        name: 'Productivity',
        description: 'Boost your efficiency with task management and workflow optimization prompts',
        icon: 'zap',
        color: 'yellow'
    },
    {
        slug: 'marketing',
        name: 'Marketing',
        description: 'Marketing strategies, ad copy, social media, and brand development',
        icon: 'megaphone',
        color: 'green'
    },
    {
        slug: 'business',
        name: 'Business',
        description: 'Business planning, strategy, analysis, and professional communications',
        icon: 'briefcase',
        color: 'indigo'
    },
    {
        slug: 'education',
        name: 'Education',
        description: 'Learning resources, teaching materials, and educational content creation',
        icon: 'graduation-cap',
        color: 'orange'
    },
    {
        slug: 'entertainment',
        name: 'Entertainment',
        description: 'Creative storytelling, game ideas, and entertainment content',
        icon: 'sparkles',
        color: 'red'
    }
];

// Helper functions
export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
    return CATEGORIES.find(cat => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
    return CATEGORIES.map(cat => cat.slug);
}

export type CategorySlug = typeof CATEGORIES[number]['slug'];
