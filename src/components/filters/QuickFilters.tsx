import React from 'react';
import { Calendar } from 'lucide-react';
import type { PeriodFilter } from '../../types/filters';

const PERIOD_OPTIONS: { value: PeriodFilter; label: string }[] = [
  { value: 'today', label: 'Aujourd\'hui' },
  { value: 'week', label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'quarter', label: 'Ce trimestre' },
  { value: 'year', label: 'Cette année' },
  { value: 'all', label: 'Tout' },
];

type QuickFiltersProps = {
  selectedPeriod: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
};

export function QuickFilters({ selectedPeriod, onPeriodChange }: QuickFiltersProps) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Période</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PERIOD_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onPeriodChange(value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${selectedPeriod === value
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}