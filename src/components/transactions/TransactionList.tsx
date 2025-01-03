import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { expenseCategories, incomeCategories } from '../../constants/categories';
import { formatCurrency, formatDate } from '../../utils/formatters';

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  const getCategoryById = (id: string) => {
    const allCategories = [...expenseCategories, ...incomeCategories];
    return allCategories.find(cat => cat.id === id) || { name: 'Non catégorisé', color: 'gray' };
  };

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
                      {formatDate(transaction.date)}
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
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
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
        {transactions.length === 0 && (
          <li className="px-6 py-8 text-center text-gray-500">
            Aucune transaction à afficher
          </li>
        )}
      </ul>
    </div>
  );
}