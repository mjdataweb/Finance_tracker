import React from 'react';
import { Calendar } from 'lucide-react';

type DateRangeFilterProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Filtrer par période</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de début
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de fin
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}