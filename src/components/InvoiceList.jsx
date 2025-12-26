import { Link } from 'react-router-dom';
import ArrowRight from './ui/ArrowRight';
import StatusBlock from './StatusBlock';
import ScrollArea from './ScrollArea';
import { format } from 'date-fns';

export default function InvoiceList({ invoices }) {
	return (
		<ScrollArea>
			<div>
				<ul className="grid gap-4">
					{invoices.map((invoice) => {
						return <Invoice key={invoice.id} invoice={invoice} />;
					})}
				</ul>
			</div>
		</ScrollArea>
	);
}

function Invoice({ invoice }) {
	return (
		<li className="dark:border-08 hover:border-01 text-08 dark:bg-08 cursor-pointer rounded-lg border border-white bg-white p-6 md:py-4 lg:px-8 dark:text-white">
			<Link
				to={`/invoice/${invoice.id}`}
				className="grid grid-cols-2 gap-y-6 md:grid-cols-[1fr_2fr_4fr_auto_auto] md:items-center md:gap-5"
			>
				<p className="text-[15px] font-bold md:mr-2 lg:mr-6">
					<span className="text-07 dark:text-06">#</span>
					{invoice.id}
				</p>
				<p className="text-06 dark:text-05 hidden text-[13px] font-medium md:inline">
					Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
				</p>{' '}
				<p className="text-06 justify-self-end text-[13px] font-medium md:hidden md:justify-self-start dark:text-white">
					{invoice.clientName}
				</p>
				<div className="grid gap-2 self-end md:grid-cols-2 md:self-center">
					<p className="text-06 hidden justify-self-end text-[13px] font-medium md:inline md:justify-self-start dark:text-white">
						{invoice.clientName}
					</p>
					<p className="text-06 dark:text-05 text-[13px] font-medium md:hidden">
						Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
					</p>{' '}
					<p className="text-[15px] font-bold md:justify-self-end">
						£ {invoice.total}
					</p>
				</div>
				<StatusBlock status={invoice.status} />
				<div className="hidden md:inline-block">
					<ArrowRight />
				</div>
			</Link>
		</li>
	);
}
