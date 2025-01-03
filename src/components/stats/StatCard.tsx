import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

type StatCardProps = {
  title: string;
  amount: number;
  Icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
};

export function StatCard({ title, amount, Icon, iconColor, iconBgColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
    </div>
  );
}