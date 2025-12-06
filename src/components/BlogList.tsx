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
    return (
        <>
            <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
                        <Loader2 size={32} className="animate-spin text-emerald-500" />
                        <p className="text-sm">Loading content from manifest...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                onClick={onPostClick}
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
