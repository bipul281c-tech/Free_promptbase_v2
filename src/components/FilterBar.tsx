import React from 'react';
import type { Category } from '../types';

interface FilterBarProps {
    selectedCategory: Category;
    setSelectedCategory: (category: Category) => void;
}

const categories: Category[] = ['All', 'Technology', 'Design', 'Development', 'AI']; // Example categories, adjust as needed

const FilterBar: React.FC<FilterBarProps> = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
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
    );
};

export default FilterBar;
