import { ApiResponse } from "@/types/marketplace";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function exportResponsesToCSV(rows: ApiResponse[]) {
  if (!rows?.length) return;
  const headers = ['id', 'createdAt', 'activeDeals', 'newDeals', 'averageDealValueUSD', 'offersSubmitted', 'userViews'];
  const csv = [
    headers.join(','),
    ...rows.map(r => [
      r.id,
      new Date(r.createdAt).toISOString(),
      r.activeDeals,
      r.newDeals,
      r.averageDealValueUSD,
      r.offersSubmitted,
      r.userViews
    ].join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `responses_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
