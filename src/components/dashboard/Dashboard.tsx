import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { StatCard } from '../stats/StatCard';
import { formatCurrency } from '../../utils/formatters';

type DashboardProps = {
  transactions: Transaction[];
};

export function Dashboard({ transactions }: DashboardProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Données pour le graphique
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const chartData = last7Days.map((date) => {
    const dayTransactions = transactions.filter((t) => t.date.startsWith(date));
    const income = dayTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = dayTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' }),
      revenus: income,
      dépenses: expenses,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Solde"
          amount={balance}
          Icon={Wallet}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Revenus"
          amount={totalIncome}
          Icon={TrendingUp}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Dépenses"
          amount={totalExpenses}
          Icon={TrendingDown}
          iconColor="text-red-600"
          iconBgColor="bg-red-100"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Aperçu des 7 derniers jours
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value}€`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="revenus" fill="#4ade80" name="Revenus" />
              <Bar dataKey="dépenses" fill="#f87171" name="Dépenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}