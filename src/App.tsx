import React from 'react';
import { Dashboard } from './components/dashboard/Dashboard';
import { TransactionForm } from './components/transactions/TransactionForm';
import { TransactionList } from './components/transactions/TransactionList';
import { FinancialAdvice } from './components/advice/FinancialAdvice';
import { DateRangeFilter } from './components/filters/DateRangeFilter';
import { FilterBar } from './components/filters/FilterBar';
import { ExportButton } from './components/ExportButton';
import { ThemeToggle } from './components/theme/ThemeToggle';
import { filterTransactions } from './utils/filters';
import type { Transaction } from './types/transaction';
import type { FilterState } from './types/filters';
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [filters, setFilters] = useState<FilterState>({
    period: 'all',
    categories: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleAddTransaction = (data: {
    type: 'income' | 'expense';
    amount: number;
    category_id: string;
    description?: string;
    date: string;
  }) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: 'user-1',
      created_at: new Date().toISOString(),
      ...data,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const dateFilteredTransactions = transactions.filter((transaction) => {
    const transactionDate = transaction.date;
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const filteredTransactions = filterTransactions(dateFilteredTransactions, filters);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tableau de Bord Financier
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <ExportButton
              transactions={filteredTransactions}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Dashboard transactions={filteredTransactions} />
            
            <div className="mt-8">
              <FinancialAdvice transactions={filteredTransactions} />
            </div>

            <div className="mt-8">
              <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
              
              <FilterBar
                filters={filters}
                onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
              />

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transactions Récentes
              </h2>
              <TransactionList transactions={filteredTransactions} />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ajouter une Transaction
            </h2>
            <TransactionForm onSubmit={handleAddTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;