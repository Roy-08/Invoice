import { useState } from "react";
import { InvoiceFormData, InvoiceType, getDefaultFormData, COMPANY_INFO } from "../types/invoice";
import InvoiceItemTable from "./InvoiceItemTable";
import InvoicePreview from "./InvoicePreview";
import { generatePDF } from "../utils/pdfGenerator";

interface InvoiceFormProps {
  invoiceType: InvoiceType;
}

export default function InvoiceForm({ invoiceType }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceFormData>(
    getDefaultFormData(invoiceType)
  );
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof InvoiceFormData, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleGeneratePDF = async () => {
    // Ensure preview is visible for PDF generation
    setShowPreview(true);
    // Wait for state update and render
    setTimeout(async () => {
      const prefix = invoiceType === "air" ? "INVOICE_A" : "INVOICE_S";
      const invoiceNum = formData.invoiceNo || "0001";
      const filename = `${prefix}${invoiceNum}.pdf`;
      await generatePDF("invoice-preview", filename);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {invoiceType === "air" ? "Air Freight" : "Sea Freight"} Invoice
            </h1>
            <p className="text-xs text-gray-500">
              {COMPANY_INFO.name} | GSTIN: {COMPANY_INFO.gstin}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleGeneratePDF}
              className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
            >
              Download PDF
            </button>
            <a
              href="/"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            >
              ← Back
            </a>
          </div>
        </div>
      </div>

      {/* Main Content - Form Only */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="space-y-3">
          {/* Invoice Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Invoice Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Invoice No
                </label>
                <input
                  type="text"
                  value={formData.invoiceNo}
                  onChange={(e) => updateField("invoiceNo", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="VGL/2024-25/001"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => updateField("invoiceDate", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  SB No
                </label>
                <input
                  type="text"
                  value={formData.sbNo}
                  onChange={(e) => updateField("sbNo", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Shipping Bill No"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  SB Date
                </label>
                <input
                  type="date"
                  value={formData.sbDate}
                  onChange={(e) => updateField("sbDate", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Bill To Party */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Bill To Party
            </h3>
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Party Name (M/S)
                </label>
                <input
                  type="text"
                  value={formData.billToPartyName}
                  onChange={(e) => updateField("billToPartyName", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  rows={2}
                  placeholder="Full Address"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => updateField("gstin", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="GSTIN"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  State Code
                </label>
                <input
                  type="text"
                  value={formData.stateCode}
                  onChange={(e) => updateField("stateCode", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent w-20"
                  placeholder="27"
                />
              </div>
            </div>
          </div>

          {/* Logistics Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Logistics Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {invoiceType === "air" && (
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    AWB No
                  </label>
                  <input
                    type="text"
                    value={formData.awbNo || ""}
                    onChange={(e) => updateField("awbNo", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Air Waybill Number"
                  />
                </div>
              )}
              {invoiceType === "sea" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      BL No
                    </label>
                    <input
                      type="text"
                      value={formData.blNo || ""}
                      onChange={(e) => updateField("blNo", e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Bill of Lading No"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Container No
                    </label>
                    <input
                      type="text"
                      value={formData.containerNo || ""}
                      onChange={(e) => updateField("containerNo", e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Container Number"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Export Invoice No
                </label>
                <input
                  type="text"
                  value={formData.exportInvoiceNo}
                  onChange={(e) => updateField("exportInvoiceNo", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Export Invoice No"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Exchange Rate
                </label>
                <input
                  type="text"
                  value={formData.exchangeRate}
                  onChange={(e) => updateField("exchangeRate", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="e.g. 83.50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  POL (Port of Loading)
                </label>
                <input
                  type="text"
                  value={formData.pol}
                  onChange={(e) => updateField("pol", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Port of Loading"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  POD (Port of Discharge)
                </label>
                <input
                  type="text"
                  value={formData.pod}
                  onChange={(e) => updateField("pod", e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Port of Discharge"
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <InvoiceItemTable
            items={formData.items}
            onItemsChange={(items) =>
              setFormData((prev: any) => ({ ...prev, items }))
            }
          />

          {/* See Preview Button */}
          <div className="flex justify-center pt-2 pb-4">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              See Preview
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal/Overlay */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8 relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-3 rounded-t-xl flex items-center justify-between z-10">
              <h3 className="text-sm font-semibold text-gray-800">
                Invoice Preview
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleGeneratePDF}
                  className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 transition-colors"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 transition-colors border border-gray-300"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            {/* Modal Body */}
            <div className="p-6 overflow-auto">
              <InvoicePreview formData={formData} invoiceType={invoiceType} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}