import React from 'react';
import { FileDown } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';
import type { Transaction } from '../types/transaction';

type ExportButtonProps = {
  transactions: Transaction[];
  startDate: string;
  endDate: string;
};

export function ExportButton({ transactions, startDate, endDate }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportToPDF(transactions, startDate, endDate)}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FileDown className="h-4 w-4 mr-2" />
      Exporter en PDF
    </button>
  );
}