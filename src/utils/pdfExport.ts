import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Transaction } from '../types/transaction';
import { formatCurrency } from './formatters';
import { expenseCategories, incomeCategories } from '../constants/categories';

export function exportToPDF(transactions: Transaction[], startDate: string, endDate: string) {
  const doc = new jsPDF();
  const allCategories = [...expenseCategories, ...incomeCategories];

  // Titre
  doc.setFontSize(20);
  doc.text('Rapport Financier', 14, 20);

  // Période
  doc.setFontSize(12);
  doc.text(
    `Période : ${format(new Date(startDate), 'dd MMMM yyyy', { locale: fr })} - ${format(
      new Date(endDate),
      'dd MMMM yyyy',
      { locale: fr }
    )}`,
    14,
    30
  );

  // Résumé financier
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  doc.text('Résumé:', 14, 40);
  doc.text(`Revenus totaux: ${formatCurrency(totalIncome)}`, 14, 48);
  doc.text(`Dépenses totales: ${formatCurrency(totalExpenses)}`, 14, 56);
  doc.text(`Solde: ${formatCurrency(balance)}`, 14, 64);

  // Tableau des transactions
  const tableData = transactions.map((transaction) => {
    const category = allCategories.find((c) => c.id === transaction.category_id);
    return [
      format(new Date(transaction.date), 'dd/MM/yyyy'),
      category?.name || 'Non catégorisé',
      transaction.description || '-',
      transaction.type === 'income' ? formatCurrency(transaction.amount) : '',
      transaction.type === 'expense' ? formatCurrency(transaction.amount) : '',
    ];
  });

  autoTable(doc, {
    startY: 75,
    head: [['Date', 'Catégorie', 'Description', 'Revenus', 'Dépenses']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [63, 81, 181] },
    styles: { fontSize: 8 },
  });

  // Pied de page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Téléchargement du PDF
  doc.save(`rapport-financier-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}