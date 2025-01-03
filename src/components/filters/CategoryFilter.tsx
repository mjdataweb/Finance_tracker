import React from 'react';
import { Tags } from 'lucide-react';
import { expenseCategories, incomeCategories } from '../../constants/categories';

type CategoryFilterProps = {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
};

export function CategoryFilter({
  selectedCategories,
  onCategoriesChange,
}: CategoryFilterProps) {
  const allCategories = [...expenseCategories, ...incomeCategories];

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <Tags className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Catégories</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors`}
              style={{
                backgroundColor: isSelected ? category.color : '#f3f4f6',
                color: isSelected ? 'white' : '#4b5563',
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}