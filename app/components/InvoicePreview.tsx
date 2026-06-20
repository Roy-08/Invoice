import { InvoiceFormData, InvoiceType, COMPANY_INFO } from "../types/invoice";
import { formatCurrency, numberToWords, formatDate } from "../utils/calculations";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface InvoicePreviewProps {
  formData: InvoiceFormData;
  invoiceType: InvoiceType;
}

export default function InvoicePreview({
  formData,
  invoiceType,
}: InvoicePreviewProps) {
  const totalAmount = formData.items.reduce((sum: any, item: { amount: any; }) => sum + item.amount, 0);
  const totalCgst = formData.items.reduce((sum: any, item: { cgstAmount: any; }) => sum + item.cgstAmount, 0);
  const totalSgst = formData.items.reduce((sum: any, item: { sgstAmount: any; }) => sum + item.sgstAmount, 0);
  const grandTotal = formData.items.reduce((sum: any, item: { total: any; }) => sum + item.total, 0);
  const totalTax = totalCgst + totalSgst;

  return (
    <div
      id="invoice-preview"
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: "210mm",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        fontSize: "11px",
        color: "#000000",
        border: "2px solid #000000",
      }}
    >
      {/* Letterhead */}
      <div style={{ width: "100%" }}>
        <img
          src="/letter_head.png"
          alt="Vandaya Global Logistics Letterhead"
          style={{ width: "100%", height: "auto", display: "block" }}
          crossOrigin="anonymous"
        />
      </div>

      {/* TAX INVOICE Title Bar */}
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#dbeafe",
          padding: "6px 0",
          borderBottom: "1px solid #000000",
          borderTop: "1px solid #000000",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "bold", letterSpacing: "2px" }}>
          TAX INVOICE
        </span>
      </div>

      {/* Invoice Details - 2 rows, 2 columns each */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                padding: "5px 8px",
                width: "50%",
                fontSize: "11px",
              }}
            >
              <strong>SB No:</strong> {formData.sbNo}
            </td>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                borderLeft: "none",
                padding: "5px 8px",
                width: "50%",
                fontSize: "11px",
              }}
            >
              <strong>Invoice No:</strong> {formData.invoiceNo}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                padding: "5px 8px",
                fontSize: "11px",
              }}
            >
              <strong>SB Date:</strong> {formatDate(formData.sbDate)}
            </td>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                borderLeft: "none",
                padding: "5px 8px",
                fontSize: "11px",
              }}
            >
              <strong>Date of Invoice:</strong> {formatDate(formData.invoiceDate)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Bill To Party + Logistics Details side by side */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            {/* Bill To Party - Left Column */}
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                verticalAlign: "top",
                width: "55%",
                padding: "0",
              }}
            >
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  padding: "4px 8px",
                  borderBottom: "1px solid #000000",
                  fontWeight: "bold",
                  fontSize: "11px",
                }}
              >
                Bill to Party
              </div>
              <div style={{ padding: "6px 8px", lineHeight: "1.8", fontSize: "11px" }}>
                <p style={{ margin: "0" }}>
                  <strong>Name:</strong> {formData.billToPartyName}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Address:</strong> {formData.address}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>GSTIN:</strong> {formData.gstin}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>State:</strong> {formData.state} &nbsp;&nbsp;
                  <strong>Code:</strong> {formData.stateCode}
                </p>
              </div>
            </td>

            {/* Logistics Details - Right Column */}
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                borderLeft: "none",
                verticalAlign: "top",
                width: "45%",
                padding: "0",
              }}
            >
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  padding: "4px 8px",
                  borderBottom: "1px solid #000000",
                  fontWeight: "bold",
                  fontSize: "11px",
                }}
              >
                Logistics Details
              </div>
              <div style={{ padding: "6px 8px", lineHeight: "1.8", fontSize: "11px" }}>
                {invoiceType === "air" && (
                  <p style={{ margin: "0" }}>
                    <strong>AWB No:</strong> {formData.awbNo}
                  </p>
                )}
                {invoiceType === "sea" && (
                  <>
                    <p style={{ margin: "0" }}>
                      <strong>BL No:</strong> {formData.blNo}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Container No:</strong> {formData.containerNo}
                    </p>
                  </>
                )}
                <p style={{ margin: "0" }}>
                  <strong>Export Inv No:</strong> {formData.exportInvoiceNo}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Ex Rate:</strong> {formData.exchangeRate}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>POL:</strong> {formData.pol}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>POD:</strong> {formData.pod}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "10px",
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "4%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "4%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "13%" }} />
        </colgroup>
        <thead>
          <tr style={{ backgroundColor: "#dbeafe" }}>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
              S.No
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "left" }}>
              Product Description
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
              HSN/SAC
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
              Curr
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              Amt
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
              Qty
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              Taxable Value
            </th>
            <th
              style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}
              colSpan={2}
            >
              CGST
              <div style={{ display: "flex", borderTop: "1px solid #000000", marginTop: "2px", marginLeft: "-3px", marginRight: "-3px", paddingTop: "2px" }}>
                <span style={{ flex: 1, textAlign: "center", borderRight: "1px solid #000000", paddingRight: "2px" }}>Rate</span>
                <span style={{ flex: 1, textAlign: "center", paddingLeft: "2px" }}>Amt</span>
              </div>
            </th>
            <th
              style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}
              colSpan={2}
            >
              SGST
              <div style={{ display: "flex", borderTop: "1px solid #000000", marginTop: "2px", marginLeft: "-3px", marginRight: "-3px", paddingTop: "2px" }}>
                <span style={{ flex: 1, textAlign: "center", borderRight: "1px solid #000000", paddingRight: "2px" }}>Rate</span>
                <span style={{ flex: 1, textAlign: "center", paddingLeft: "2px" }}>Amt</span>
              </div>
            </th>
            <th style={{ border: "1px solid #000000", borderTop: "none", padding: "1px 4px", textAlign: "center" }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {formData.items.length === 0 ? (
            <tr>
              <td
                colSpan={12}
                style={{
                  border: "1px solid #000000",
                  borderTop: "none",
                  padding: "20px",
                  textAlign: "center",
                  color: "#9ca3af",
                }}
              >
                No items added
              </td>
            </tr>
          ) : (
            formData.items.map((item: { id: Key | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; hsnCode: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; currency: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; rate: any; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; amount: any; cgstRate: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; cgstAmount: any; sgstRate: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; sgstAmount: any; total: any; }, index: number) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "left" }}>
                  {item.description}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {item.hsnCode}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {item.currency}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
                  {formatCurrency(item.rate)}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {item.quantity}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
                  {formatCurrency(item.amount)}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {item.cgstRate}%
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
                  {formatCurrency(item.cgstAmount)}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}>
                  {item.sgstRate}%
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
                  {formatCurrency(item.sgstAmount)}
                </td>
                <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))
          )}
          {/* Totals Row */}
          <tr style={{ fontWeight: "bold", backgroundColor: "#f9fafb" }}>
            <td colSpan={6} style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              Total
            </td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              {formatCurrency(totalAmount)}
            </td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}></td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              {formatCurrency(totalCgst)}
            </td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "center" }}></td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              {formatCurrency(totalSgst)}
            </td>
            <td style={{ border: "1px solid #000000", borderTop: "none", padding: "4px 3px", textAlign: "right" }}>
              {formatCurrency(grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Amount in Words */}
      <div
        style={{
          backgroundColor: "#dbeafe",
          padding: "4px 8px",
          borderBottom: "1px solid #000000",
          fontWeight: "bold",
          fontSize: "10px",
        }}
      >
        Total Amount in Words
      </div>
      <div
        style={{
          padding: "5px 8px",
          borderBottom: "1px solid #000000",
          fontSize: "11px",
        }}
      >
        {numberToWords(grandTotal)}
      </div>

      {/* Bank Details + Totals Summary */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            {/* Bank Details - Left */}
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                verticalAlign: "top",
                width: "50%",
                padding: "0",
              }}
            >
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  padding: "4px 8px",
                  borderBottom: "1px solid #000000",
                  fontWeight: "bold",
                  fontSize: "10px",
                }}
              >
                Bank Details
              </div>
              <div style={{ padding: "6px 8px", lineHeight: "1.8", fontSize: "11px" }}>
                <p style={{ margin: "0" }}>
                  <strong>Bank A/C:</strong> {COMPANY_INFO.accountNo}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Bank IFSC:</strong> {COMPANY_INFO.ifscCode}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Bank Name:</strong> {COMPANY_INFO.bankName}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Branch Name:</strong> {COMPANY_INFO.bankBranch}
                </p>
              </div>
            </td>

            {/* Totals Summary - Right */}
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                borderLeft: "none",
                verticalAlign: "top",
                width: "50%",
                padding: "8px 10px",
                fontSize: "11px",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px 0", textAlign: "left" }}>Total Amount before Tax:</td>
                    <td style={{ padding: "3px 0", textAlign: "right" }}>₹ {formatCurrency(totalAmount)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 0", textAlign: "left" }}>Add: CGST:</td>
                    <td style={{ padding: "3px 0", textAlign: "right" }}>₹ {formatCurrency(totalCgst)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 0", textAlign: "left" }}>Add: SGST:</td>
                    <td style={{ padding: "3px 0", textAlign: "right" }}>₹ {formatCurrency(totalSgst)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "3px 0", textAlign: "left" }}>Total Tax Amount:</td>
                    <td style={{ padding: "3px 0", textAlign: "right" }}>₹ {formatCurrency(totalTax)}</td>
                  </tr>
                  <tr style={{ fontWeight: "bold", borderTop: "1px solid #000000" }}>
                    <td style={{ padding: "5px 0 3px", textAlign: "left" }}>Total Amount after Tax:</td>
                    <td style={{ padding: "5px 0 3px", textAlign: "right" }}>₹ {formatCurrency(grandTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Signature Section */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                padding: "10px",
                width: "50%",
                verticalAlign: "top",
                fontSize: "11px",
              }}
            >
            </td>
            <td
              style={{
                border: "1px solid #000000",
                borderTop: "none",
                borderLeft: "none",
                padding: "10px",
                width: "50%",
                textAlign: "center",
                verticalAlign: "top",
                fontSize: "11px",
              }}
            >
              <img
                src="/signature.png"
                alt="Authorized Signature"
                style={{ height: "70px", margin: "6px auto", display: "block" }}
                crossOrigin="anonymous"
              />
              <p style={{ margin: "4px 0 0 0", fontWeight: "bold", fontSize: "11px" }}>Sign.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}