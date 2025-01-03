import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortBy, SortOrder } from '../../types/filters';

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'amount', label: 'Montant' },
  { value: 'category', label: 'Catégorie' },
];

type SortOptionsProps = {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sort: { sortBy?: SortBy; sortOrder?: SortOrder }) => void;
};

export function SortOptions({ sortBy, sortOrder, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Trier par</span>
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange({ sortBy: e.target.value as SortBy })}
        className="rounded-md border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <button
        onClick={() => onSortChange({
          sortOrder: sortOrder === 'asc' ? 'desc' : 'asc'
        })}
        className="p-1.5 rounded-md hover:bg-gray-100"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}