import { InvoiceItem } from "../types/invoice";
import {
  calculateSubtotal,
  calculateCGST,
  calculateSGST,
  calculateGrandTotal,
  formatCurrency,
} from "../utils/calculations";

interface GSTSummaryProps {
  items: InvoiceItem[];
  cgstPercent: number;
  sgstPercent: number;
  onCgstChange: (value: number) => void;
  onSgstChange: (value: number) => void;
}

export default function GSTSummary({
  items,
  cgstPercent,
  sgstPercent,
  onCgstChange,
  onSgstChange,
}: GSTSummaryProps) {
  const subtotal = calculateSubtotal(items);
  const cgstAmount = calculateCGST(subtotal, cgstPercent);
  const sgstAmount = calculateSGST(subtotal, sgstPercent);
  const grandTotal = calculateGrandTotal(subtotal, cgstAmount, sgstAmount);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        GST Calculation
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Taxable Value (Subtotal)
          </span>
          <span className="text-sm font-medium text-gray-800">
            ₹ {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">CGST @</span>
            <input
              type="number"
              value={cgstPercent}
              onChange={(e) => onCgstChange(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              min="0"
              max="100"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            ₹ {formatCurrency(cgstAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">SGST @</span>
            <input
              type="number"
              value={sgstPercent}
              onChange={(e) => onSgstChange(parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              min="0"
              max="100"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            ₹ {formatCurrency(sgstAmount)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-800">
              Grand Total
            </span>
            <span className="text-lg font-bold text-blue-700">
              ₹ {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}