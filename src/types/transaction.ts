export type TransactionType = 'income' | 'expense';

export type TransactionCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category_id: string;
  description?: string;
  date: string;
  user_id: string;
  created_at: string;
};