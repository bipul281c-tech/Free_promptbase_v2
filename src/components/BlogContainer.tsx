import React, { useState, useEffect } from 'react';
import type { BlogPost, Category } from '../types';
import BlogList from './BlogList';

interface BlogContainerProps {
    initialPosts: BlogPost[];
}

const BlogContainer: React.FC<BlogContainerProps> = ({ initialPosts }) => {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    useEffect(() => {
        // Simulate filtering or loading if needed
        // For now, we just filter locally based on initialPosts
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (selectedCategory === 'All') {
                setPosts(initialPosts);
            } else {
                // Assuming tags contain the category or some other logic
                // For this example, I'll just filter by tags if available, or just return all for now to avoid empty state if tags are missing
                const filtered = initialPosts.filter(post =>
                    post.data.tags?.includes(selectedCategory) ||
                    post.data.category === selectedCategory
                );
                setPosts(filtered);
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedCategory, initialPosts]);

    const handlePostClick = (post: BlogPost) => {
        window.location.href = `/blog/${post.data.category}/${post.id}/`;
    };

    const handleClearFilters = () => {
        setSelectedCategory('All');
    };

    return (
        <BlogList
            posts={posts}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onPostClick={handlePostClick}
            onClearFilters={handleClearFilters}
        />
    );
};

export default BlogContainer;
