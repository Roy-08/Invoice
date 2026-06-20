import { InvoiceItem } from "../types/invoice";
import { formatCurrency } from "../utils/calculations";

interface InvoiceItemTableProps {
  items: InvoiceItem[];
  onItemsChange: (items: InvoiceItem[]) => void;
}

function recalculateItem(item: InvoiceItem): InvoiceItem {
  const amount = Math.round(item.quantity * item.rate * 100) / 100;
  const cgstAmount = Math.round(((amount * item.cgstRate) / 100) * 100) / 100;
  const sgstAmount = Math.round(((amount * item.sgstRate) / 100) * 100) / 100;
  const total = Math.round((amount + cgstAmount + sgstAmount) * 100) / 100;
  return { ...item, amount, cgstAmount, sgstAmount, total };
}

export default function InvoiceItemTable({
  items,
  onItemsChange,
}: InvoiceItemTableProps) {
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      hsnCode: "",
      currency: "INR",
      quantity: 1,
      rate: 0,
      amount: 0,
      cgstRate: 9,
      cgstAmount: 0,
      sgstRate: 9,
      sgstAmount: 0,
      total: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (
          field === "quantity" ||
          field === "rate" ||
          field === "cgstRate" ||
          field === "sgstRate"
        ) {
          return recalculateItem(updated);
        }
        return updated;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalCgst = items.reduce((sum, item) => sum + item.cgstAmount, 0);
  const totalSgst = items.reduce((sum, item) => sum + item.sgstAmount, 0);
  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Invoice Items</h3>
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">
          No items added yet. Click &quot;Add Item&quot; to begin.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 relative">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold w-5 h-5 flex items-center justify-center rounded hover:bg-red-50"
                title="Remove Item"
              >
                ✕
              </button>
              <div className="text-xs font-semibold text-gray-500 mb-2">Item {index + 1}</div>
              
              {/* Row 1: Description, HSN, Currency */}
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-6">
                  <label className="block text-xs text-gray-500 mb-0.5">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Product/Service Description"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-gray-500 mb-0.5">HSN/SAC Code</label>
                  <input
                    type="text"
                    value={item.hsnCode}
                    onChange={(e) => updateItem(item.id, "hsnCode", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="HSN/SAC"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs text-gray-500 mb-0.5">Currency</label>
                  <input
                    type="text"
                    value={item.currency}
                    onChange={(e) => updateItem(item.id, "currency", e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="INR"
                  />
                </div>
              </div>

              {/* Row 2: Qty, Rate, Taxable Value, CGST, SGST, Total */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">Qty</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs text-right focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">Rate</label>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs text-right focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">Taxable Value</label>
                  <div className="px-2 py-1.5 bg-white border border-gray-200 rounded text-xs text-right font-medium">
                    {formatCurrency(item.amount)}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">CGST %</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={item.cgstRate}
                      onChange={(e) => updateItem(item.id, "cgstRate", parseFloat(e.target.value) || 0)}
                      className="w-12 px-1 py-1.5 border border-gray-200 rounded text-xs text-center focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-gray-500">= ₹{formatCurrency(item.cgstAmount)}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">SGST %</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={item.sgstRate}
                      onChange={(e) => updateItem(item.id, "sgstRate", parseFloat(e.target.value) || 0)}
                      className="w-12 px-1 py-1.5 border border-gray-200 rounded text-xs text-center focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-gray-500">= ₹{formatCurrency(item.sgstAmount)}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-0.5">Total</label>
                  <div className="px-2 py-1.5 bg-blue-50 border border-blue-200 rounded text-xs text-right font-semibold text-blue-700">
                    ₹{formatCurrency(item.total)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Totals Summary */}
          <div className="border-t border-gray-200 pt-3 mt-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold">
              <div className="col-span-4 text-right text-gray-600">Totals:</div>
              <div className="col-span-2 text-right">₹{formatCurrency(totalAmount)}</div>
              <div className="col-span-2 text-right">CGST: ₹{formatCurrency(totalCgst)}</div>
              <div className="col-span-2 text-right">SGST: ₹{formatCurrency(totalSgst)}</div>
              <div className="col-span-2 text-right text-blue-700">Grand Total: ₹{formatCurrency(grandTotal)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}