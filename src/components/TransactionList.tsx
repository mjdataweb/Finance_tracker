import React from 'react';
import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { Transaction, TransactionCategory } from '../types/transaction';

type TransactionListProps = {
  transactions: Transaction[];
  categories: TransactionCategory[];
};

export function TransactionList({ transactions, categories }: TransactionListProps) {
  const getCategoryById = (id: string) => 
    categories.find(cat => cat.id === id) || { name: 'Uncategorized', color: 'gray' };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => {
          const category = getCategoryById(transaction.category_id);
          return (
            <li key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-8 w-8 text-red-500" />
                  )}
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description || category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount.toFixed(2)}
                  </span>
                  <span
                    className="ml-2 px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                    }}
                  >
                    {category.name}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}