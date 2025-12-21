import InvoicesHeader from '../components/InvoicesHeader';
import InvoiceList from '../components/InvoiceList';
import { useInvoiceStore } from '../stores/invoiceStore';
import EmptyInvoiceList from '../components/EmptyInvoiceList';

export default function Invoices() {
	const invoiceList = useInvoiceStore((s) => s.invoiceList);

	return (
		<div>
			<InvoicesHeader />
			{invoiceList.length > 0 ? <InvoiceList /> : <EmptyInvoiceList />}
		</div>
	);
}
