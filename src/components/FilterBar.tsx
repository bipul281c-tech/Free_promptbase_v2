import React from 'react';
import type { Category } from '../types';

import { ArrowDownAZ, ArrowUpNarrowWide } from 'lucide-react';

interface FilterBarProps {
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
    sortOption: 'newest' | 'popular';
    setSortOption: (option: 'newest' | 'popular') => void;
}

const categories: Category[] = ['All', 'Technology', 'Design', 'Development', 'AI']; // Example categories, adjust as needed

const FilterBar: React.FC<FilterBarProps> = ({ selectedCategory, setSelectedCategory, sortOption, setSortOption }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                            ? 'bg-emerald-500 text-white'
                            : 'bg-surface border border-border text-secondary hover:text-white hover:border-neutral-600'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex bg-surface border border-border rounded-lg p-1">
                <button
                    onClick={() => setSortOption('newest')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sortOption === 'newest'
                        ? 'bg-neutral-800 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-white'
                        }`}
                >
                    <ArrowDownAZ size={14} />
                    Newest
                </button>
                <button
                    onClick={() => setSortOption('popular')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sortOption === 'popular'
                        ? 'bg-neutral-800 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-white'
                        }`}
                >
                    <ArrowUpNarrowWide size={14} />
                    Popular
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
