export type PeriodFilter = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all';
export type SortBy = 'date' | 'amount' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  period: PeriodFilter;
  categories: string[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}