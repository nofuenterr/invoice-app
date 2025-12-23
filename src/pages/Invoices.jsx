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
		<div>
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
