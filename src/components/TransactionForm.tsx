import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { TransactionType } from '../types/transaction';

type TransactionFormProps = {
  onSubmit: (data: {
    type: TransactionType;
    amount: number;
    category_id: string;
    description?: string;
    date: string;
  }) => void;
  categories: Array<{ id: string; name: string }>;
};

export function TransactionForm({ onSubmit, categories }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      amount: parseFloat(amount),
      category_id: categoryId,
      description,
      date,
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 px-4 rounded-md ${
            type === 'expense'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 px-4 rounded-md ${
            type === 'income'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Income
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Transaction
      </button>
    </form>
  );
}