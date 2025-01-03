import React from 'react';
import { AlertTriangle, ThumbsUp } from 'lucide-react';
import type { Transaction } from '../../types/transaction';

type FinancialAdviceProps = {
  transactions: Transaction[];
};

export function FinancialAdvice({ transactions }: FinancialAdviceProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const getAdvice = () => {
    if (totalIncome === 0) {
      return {
        type: 'warning',
        message: 'Commencez par enregistrer vos revenus pour obtenir des conseils personnalisés.',
        icon: AlertTriangle,
      };
    }

    if (savingsRate >= 20) {
      return {
        type: 'success',
        message: 'Excellent ! Vous épargnez plus de 20% de vos revenus. Continuez ainsi !',
        icon: ThumbsUp,
      };
    }

    if (savingsRate > 0) {
      return {
        type: 'warning',
        message: 'Vous épargnez, mais essayez d\'atteindre 20% d\'épargne pour plus de sécurité financière.',
        icon: AlertTriangle,
      };
    }

    return {
      type: 'danger',
      message: 'Attention : vos dépenses dépassent vos revenus. Essayez de réduire vos dépenses non essentielles.',
      icon: AlertTriangle,
    };
  };

  const advice = getAdvice();
  const Icon = advice.icon;

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  }[advice.type];

  const textColor = {
    success: 'text-green-800',
    warning: 'text-yellow-800',
    danger: 'text-red-800',
  }[advice.type];

  const iconColor = {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  }[advice.type];

  return (
    <div className={`p-4 rounded-lg border ${bgColor}`}>
      <div className="flex items-start">
        <div className={`mr-3 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${textColor}`}>
            Conseil financier
          </h3>
          <p className={`mt-1 text-sm ${textColor}`}>
            {advice.message}
          </p>
          {totalIncome > 0 && (
            <p className={`mt-2 text-sm ${textColor}`}>
              Taux d'épargne actuel : {savingsRate.toFixed(1)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}