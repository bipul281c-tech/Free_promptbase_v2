import React from 'react';
import { Loader2 } from 'lucide-react';
import type { BlogPost, Category } from '../types';
import BlogCard from './BlogCard';
import FilterBar from './FilterBar';

interface BlogListProps {
    posts: BlogPost[];
    isLoading: boolean;
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
    onPostClick: (post: BlogPost) => void;
    onClearFilters: () => void;
}

const BlogList: React.FC<BlogListProps> = ({
    posts,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    onPostClick,
    onClearFilters
}) => {


    // Sorting state
    const [sortOption, setSortOption] = React.useState<'newest' | 'popular'>('newest');

    // Fetch views logic
    const [viewCounts, setViewCounts] = React.useState<Record<string, number>>({});

    React.useEffect(() => {
        const fetchViews = async () => {
            if (posts.length === 0) return;

            // Extract slugs from post IDs (assuming id is slug or contains it)
            // post.id in content collections is usually the slug
            const slugs = posts.map(p => p.id);

            // Dynamic import to avoid SSR issues if this runs in Astro component context without client directive, 
            // but this is a React component so it should be fine if hydrated.
            // However, we need to make sure supabase client is available.
            // Using a simple import here assuming this runs on client.
            try {
                const { supabase } = await import('../lib/supabase');

                const { data, error } = await supabase
                    .from('post_views')
                    .select('slug, count')
                    .in('slug', slugs);

                if (data && !error) {
                    const newCounts: Record<string, number> = {};
                    data.forEach((row: { slug: string; count: number }) => {
                        newCounts[row.slug] = row.count;
                    });
                    setViewCounts(newCounts);
                }
            } catch (e) {
                console.error("Failed to fetch views", e);
            }
        };

        // Only run on client
        if (typeof window !== 'undefined') {
            fetchViews();
        }
    }, [posts]);

    // Derived sorted posts
    const sortedPosts = React.useMemo(() => {
        let sorted = [...posts];
        if (sortOption === 'popular') {
            sorted.sort((a, b) => {
                const viewsA = viewCounts[a.id] || 0;
                const viewsB = viewCounts[b.id] || 0;
                return viewsB - viewsA; // Descending
            });
        } else {
            // Default newest (already likely sorted by date from parent, but ensuring here)
            sorted.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
        }
        return sorted;
    }, [posts, sortOption, viewCounts]);

    return (
        <>
            <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
                        <Loader2 size={32} className="animate-spin text-emerald-500" />
                        <p className="text-sm">Loading content from manifest...</p>
                    </div>
                ) : sortedPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedPosts.map(post => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                onClick={onPostClick}
                                viewCount={viewCounts[post.id]}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-neutral-500">
                        <p>No blogs found matching your criteria.</p>
                        <button
                            onClick={onClearFilters}
                            className="mt-4 text-xs underline hover:text-white"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {!isLoading && posts.length > 0 && (
                    <div className="mt-12 text-center">
                        <button className="text-xs font-medium text-secondary hover:text-white border border-border hover:border-neutral-600 bg-surface px-6 py-2.5 rounded-md transition-all">
                            Load more posts
                        </button>
                    </div>
                )}
            </section>
        </>
    );
};

export default BlogList;
