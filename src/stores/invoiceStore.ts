import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import initialInvoices from '../data/data.json';

export interface Address {
	street: string;
	city: string;
	postCode: string;
	country: string;
}

export interface InvoiceItem {
	name: string;
	quantity: number;
	price: number;
	total: number;
}

export type InvoiceStatus = 'paid' | 'pending' | 'draft';

export interface Invoice {
	id: string;
	createdAt: string; // Date
	paymentDue: string; // Date
	description: string;
	paymentTerms: number; // days
	clientName: string;
	clientEmail: string;
	status: InvoiceStatus;
	senderAddress: Address;
	clientAddress: Address;
	items: InvoiceItem[];
	total: number;
}

export interface InvoiceState {
	invoiceList: Invoice[];
	hasHydrated: boolean;
	addInvoice: (invoice: Invoice) => void;
	editInvoice: (invoice: Invoice) => void;
	deleteInvoice: (id: string) => void;
	markInvoiceAsPaid: (id: string) => void;
	getInvoice: (id: string) => Invoice;
}

export const useInvoiceStore = create<InvoiceState>()(
	persist(
		immer((set, get) => ({
			invoiceList: initialInvoices as Invoice[],
			hasHydrated: false,
			addInvoice: (invoice: Invoice) =>
				set((state) => {
					state.invoiceList.push(invoice);
				}),
			editInvoice: (invoice: Invoice) =>
				set((state) => {
					const index = state.invoiceList.findIndex(
						(iv) => invoice.id === iv.id
					);
					state.invoiceList[index] = invoice;
				}),
			deleteInvoice: (id: string) =>
				set((state) => {
					state.invoiceList = get().invoiceList.filter((iv) => iv.id !== id);
				}),
			markInvoiceAsPaid: (id: string) =>
				set((state) => {
					const index = state.invoiceList.findIndex((iv) => id === iv.id);
					state.invoiceList[index].status = 'paid';
				}),
			getInvoice: (id: string) => {
				return get().invoiceList.find((iv) => iv.id === id) as Invoice;
			},
		})),
		{
			name: 'invoice-storage',
			onRehydrateStorage: (state) => {
				console.log('hydration starts');

				return (state, error) => {
					if (error) {
						console.log('an error happened during hydration', error);
					} else {
						if (state) {
							state.hasHydrated = true;
						}
						console.log('hydration finished');
					}
				};
			},
		}
	)
);
