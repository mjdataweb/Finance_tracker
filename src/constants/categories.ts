import { TransactionCategory } from '../types/transaction';

export const expenseCategories: TransactionCategory[] = [
  { id: 'expense-1', name: 'Alimentation', icon: 'utensils', color: '#EF4444' },
  { id: 'expense-2', name: 'Transport', icon: 'car', color: '#3B82F6' },
  { id: 'expense-3', name: 'Shopping', icon: 'shopping-bag', color: '#8B5CF6' },
  { id: 'expense-4', name: 'Factures', icon: 'file-text', color: '#F59E0B' },
  { id: 'expense-5', name: 'Logement', icon: 'home', color: '#EC4899' },
  { id: 'expense-6', name: 'Loisirs', icon: 'game-controller', color: '#6366F1' },
  { id: 'expense-7', name: 'Santé', icon: 'heart-pulse', color: '#14B8A6' },
];

export const incomeCategories: TransactionCategory[] = [
  { id: 'income-1', name: 'Salaire', icon: 'briefcase', color: '#10B981' },
  { id: 'income-2', name: 'Freelance', icon: 'laptop', color: '#6366F1' },
  { id: 'income-3', name: 'Investissements', icon: 'trending-up', color: '#8B5CF6' },
  { id: 'income-4', name: 'Cadeaux', icon: 'gift', color: '#EC4899' },
  { id: 'income-5', name: 'Remboursements', icon: 'receipt', color: '#F59E0B' },
];