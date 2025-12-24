import InvoicesHeader from '../components/InvoicesHeader';
import InvoiceList from '../components/InvoiceList';
import { useInvoiceStore } from '../stores/invoiceStore';
import EmptyInvoiceList from '../components/EmptyInvoiceList';
import { useImmer } from 'use-immer';
import { useCallback, useMemo } from 'react';

export default function Invoices() {
	const invoiceList = useInvoiceStore((s) => s.invoiceList);
	const [filters, setFilters] = useImmer([]);

	const handleFilters = useCallback(
		(filter) => {
			setFilters((draft) => {
				const index = draft.findIndex((f) => filter === f);
				if (index !== -1) {
					draft.splice(index, 1);
				} else {
					draft.push(filter);
				}
			});
		},
		[setFilters]
	);

	const invoices = useMemo(() => {
		return invoiceList.filter((invoice) => {
			return filters.length > 0 ? filters.includes(invoice.status) : true;
		});
	}, [filters, invoiceList]);

	return (
		<div className="grid h-full grid-cols-[minmax(0,576px)] grid-rows-[auto_1fr] content-start justify-center gap-8 overflow-hidden px-6 py-8 md:grid-cols-[minmax(0,672px)] md:gap-14 md:px-12 md:py-15 lg:grid-cols-[minmax(0,730px)] lg:gap-16 lg:px-15 lg:py-20">
			<InvoicesHeader
				invoices={invoices}
				filters={filters}
				handleFilters={handleFilters}
			/>
			{invoices.length > 0 ? (
				<InvoiceList invoices={invoices} />
			) : (
				<EmptyInvoiceList />
			)}
		</div>
	);
}
