export interface InvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  currency: string;
  quantity: number;
  rate: number;
  amount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  total: number;
}

export interface InvoiceFormData {
  invoiceNo: string;
  invoiceDate: string;
  sbNo: string;
  sbDate: string;
  billToPartyName: string;
  address: string;
  gstin: string;
  state: string;
  stateCode: string;
  pol: string;
  pod: string;
  exchangeRate: string;
  exportInvoiceNo: string;
  // Air specific
  awbNo?: string;
  // Sea specific
  blNo?: string;
  containerNo?: string;
  // Items
  items: InvoiceItem[];
}

export type InvoiceType = "air" | "sea";

export const COMPANY_INFO = {
  name: "VANDAYA GLOBAL LOGISTICS",
  gstin: "27AYEPT2116L1Z7",
  state: "Maharashtra",
  stateCode: "27",
  address:
    "Unit No: 315, 3rd Floor, Gala Industrial Complex, Din Dayal Upadhyay Marg, Landmark Damping Road, Mulund West, Mumbai - 400080, Maharashtra",
  phone: "+91 91123 11766 / 97697 05755",
  email: "daayanand@vandayaglobal.com",
  bankName: "IndusInd Bank",
  bankBranch: "Dombivali",
  accountNo: "201002455498",
  ifscCode: "INDB0000346",
  proprietor: "Dayanand I.",
};

export const getDefaultFormData = (type: InvoiceType): InvoiceFormData => ({
  invoiceNo: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  sbNo: "",
  sbDate: "",
  billToPartyName: "",
  address: "",
  gstin: "",
  state: "Maharashtra",
  stateCode: "27",
  pol: "",
  pod: "",
  exchangeRate: "",
  exportInvoiceNo: "",
  awbNo: type === "air" ? "" : undefined,
  blNo: type === "sea" ? "" : undefined,
  containerNo: type === "sea" ? "" : undefined,
  items: [],
});