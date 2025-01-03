import { startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from 'date-fns';
import type { Transaction } from '../types/transaction';
import type { FilterState } from '../types/filters';
import { expenseCategories, incomeCategories } from '../constants/categories';

export function filterTransactions(transactions: Transaction[], filters: FilterState): Transaction[] {
  let filtered = [...transactions];

  // Filtre par période
  if (filters.period !== 'all') {
    const now = new Date();
    const getStartDate = {
      today: () => startOfDay(now),
      week: () => startOfWeek(now),
      month: () => startOfMonth(now),
      quarter: () => startOfQuarter(now),
      year: () => startOfYear(now),
    }[filters.period];

    if (getStartDate) {
      const startDate = getStartDate();
      filtered = filtered.filter(t => new Date(t.date) >= startDate);
    }
  }

  // Filtre par catégories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(t => filters.categories.includes(t.category_id));
  }

  // Tri
  const allCategories = [...expenseCategories, ...incomeCategories];
  filtered.sort((a, b) => {
    if (filters.sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (filters.sortBy === 'amount') {
      return a.amount - b.amount;
    }
    if (filters.sortBy === 'category') {
      const catA = allCategories.find(c => c.id === a.category_id)?.name || '';
      const catB = allCategories.find(c => c.id === b.category_id)?.name || '';
      return catA.localeCompare(catB);
    }
    return 0;
  });

  // Ordre de tri
  if (filters.sortOrder === 'desc') {
    filtered.reverse();
  }

  return filtered;
}