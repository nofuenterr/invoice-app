import { useInvoiceStore } from '../stores/invoiceStore';
import { Link } from 'react-router-dom';

export default function InvoiceList() {
	const invoiceList = useInvoiceStore((s) => s.invoiceList);

	return (
		<div>
			<ul>
				{invoiceList.map((invoice) => {
					return <Invoice key={invoice.id} invoice={invoice} />;
				})}
			</ul>
		</div>
	);
}

function Invoice({ invoice }) {
	return (
		<li className="cursor-pointer">
			<Link to={`/invoice/${invoice.id}`}>
				<p>{invoice.id}</p>
				<p>Due {invoice.paymentDue}</p> {/* format date (date.fns) */}
				<p>{invoice.clientName}</p>
				<p>£ {invoice.total}</p>
				<div>
					{/* status indicator */}
					{invoice.status}
				</div>
				<div>{/* arrow right */}</div>
			</Link>
		</li>
	);
}
