import React from 'react';
import { Bookmark, Eye, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogCardProps {
    post: BlogPost;
    onClick: (post: BlogPost) => void;
}

const colorClasses: Record<
    string,
    { bg: string; text: string; border: string; hover: string; icon: string }
> = {
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
        hover: "group-hover:text-purple-300",
        icon: "bg-purple-900 border-purple-800",
    },
    green: {
        bg: "bg-green-500/10",
        text: "text-green-400",
        border: "border-green-500/20",
        hover: "group-hover:text-green-300",
        icon: "bg-green-900 border-green-800",
    },
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        hover: "group-hover:text-blue-300",
        icon: "bg-blue-900 border-blue-800",
    },
    orange: {
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        border: "border-orange-500/20",
        hover: "group-hover:text-orange-300",
        icon: "bg-orange-900 border-orange-800",
    },
    indigo: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-400",
        border: "border-indigo-500/20",
        hover: "group-hover:text-indigo-300",
        icon: "bg-indigo-900 border-indigo-800",
    },
};

const getColorForPost = (post: BlogPost): string => {
    const colors = Object.keys(colorClasses);
    // Simple hash based on title length or first char to be deterministic
    const index = post.data.title.length % colors.length;
    return colors[index];
};

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
    const { title, pubDate, description, prompt, author, views, tags } = post.data;
    const color = getColorForPost(post);
    const currentColor = colorClasses[color];

    const formattedDate = new Date(pubDate).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const type = tags && tags.length > 0 ? tags[0] : 'Blog';
    const displayViews = views ? (views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views) : '0';
    const displayAuthor = author || 'Anonymous';

    return (
        <article
            className="group relative flex flex-col justify-between bg-surface/30 border border-border rounded-xl p-5 hover:border-neutral-600 hover:bg-surface/50 active:bg-surface/60 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/50 cursor-pointer"
            onClick={() => onClick(post)}
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded border ${currentColor.text} ${currentColor.border} ${currentColor.bg}`}
                        >
                            {type}
                        </span>
                        <span className="text-[10px] text-neutral-500">{formattedDate}</span>
                    </div>
                    <button
                        className="text-neutral-500 hover:text-white transition-colors z-20 p-2 -m-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle bookmark logic if needed
                        }}
                        aria-label="Bookmark prompt"
                    >
                        <Bookmark size={16} />
                    </button>
                </div>
                <h2
                    className={`text-base font-medium text-white tracking-tight mb-2 ${currentColor.hover} transition-colors`}
                >
                    {title}
                </h2>
                <p className="text-xs text-secondary leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                {prompt && (
                    <div
                        className="relative bg-black/50 rounded-lg p-3 border border-border group-hover:border-neutral-700 transition-colors mb-4"
                    >
                        <code
                            className="text-[10px] font-mono text-neutral-400 block line-clamp-3"
                        >
                            {prompt}
                        </code>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                        >
                        </div>
                    </div>
                )}
            </div>

            <div
                className="flex items-center justify-between mt-auto pt-4 border-t border-border/50"
            >
                <div className="flex items-center gap-2">
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white border border-opacity-50 ${currentColor.icon}`}
                    >
                        {displayAuthor.charAt(0)}
                    </div>
                    <span className="text-xs text-neutral-400">{displayAuthor}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
                        <Eye size={12} />
                        {displayViews}
                    </div>
                    <div
                        className="flex items-center gap-1 text-neutral-500 text-[10px] group-hover:text-white transition-colors"
                    >
                        Read Post <ArrowRight size={10} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
