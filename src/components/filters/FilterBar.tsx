import React from 'react';
import { Filter, SortDesc, SortAsc } from 'lucide-react';
import { QuickFilters } from './QuickFilters';
import { CategoryFilter } from './CategoryFilter';
import { SortOptions } from './SortOptions';
import type { FilterState } from '../../types/filters';

type FilterBarProps = {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
};

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-indigo-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Filtres avancés</h3>
        </div>
        <button
          onClick={() => onFilterChange({
            period: 'all',
            categories: [],
            sortBy: 'date',
            sortOrder: 'desc'
          })}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <div className="space-y-4">
        <QuickFilters
          selectedPeriod={filters.period}
          onPeriodChange={(period) => onFilterChange({ period })}
        />

        <div className="border-t border-gray-200 pt-4">
          <CategoryFilter
            selectedCategories={filters.categories}
            onCategoriesChange={(categories) => onFilterChange({ categories })}
          />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <SortOptions
            sortBy={filters.sortBy}
            sortOrder={filters.sortOrder}
            onSortChange={(sort) => onFilterChange(sort)}
          />
        </div>
      </div>
    </div>
  );
}