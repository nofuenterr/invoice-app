import { Link } from 'react-router-dom';
import ArrowRight from './ui/ArrowRight';

export default function InvoiceList({ invoices }) {
	return (
		<div>
			<ul className="grid gap-4">
				{invoices.map((invoice) => {
					return <Invoice key={invoice.id} invoice={invoice} />;
				})}
			</ul>
		</div>
	);
}

function Invoice({ invoice }) {
	const statusBackground =
		invoice.status === 'paid'
			? 'bg-paid-light'
			: invoice.status === 'pending'
				? 'bg-pending-light'
				: 'bg-draft-light dark:bg-05-light';
	const statusIndicator =
		invoice.status === 'paid'
			? 'bg-paid'
			: invoice.status === 'pending'
				? 'bg-pending'
				: 'bg-draft dark:bg-05';
	const statusTextColor =
		invoice.status === 'paid'
			? 'text-paid'
			: invoice.status === 'pending'
				? 'text-pending'
				: 'text-draft dark:text-05';
	const statusText =
		invoice.status === 'paid'
			? 'Paid'
			: invoice.status === 'pending'
				? 'Pending'
				: 'Draft';

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
					Due {invoice.paymentDue}
				</p>{' '}
				{/* format date (date.fns) */}
				<p className="text-06 justify-self-end text-[13px] font-medium md:hidden md:justify-self-start dark:text-white">
					{invoice.clientName}
				</p>
				<div className="grid gap-2 self-end md:grid-cols-2 md:self-center">
					<p className="text-06 hidden justify-self-end text-[13px] font-medium md:inline md:justify-self-start dark:text-white">
						{invoice.clientName}
					</p>
					<p className="text-06 dark:text-05 text-[13px] font-medium md:hidden">
						Due {invoice.paymentDue}
					</p>{' '}
					{/* format date (date.fns) */}
					<p className="text-[15px] font-bold md:justify-self-end">
						£ {invoice.total}
					</p>
				</div>
				<div
					className={
						'flex w-[104px] items-center justify-center gap-2 justify-self-end rounded-md py-3.5 text-[15px] font-bold md:ml-5 ' +
						statusBackground
					}
				>
					<div className={'size-2 rounded-full ' + statusIndicator}></div>
					<span className={statusTextColor}>{statusText}</span>
				</div>
				<div className="hidden md:inline-block">
					<ArrowRight />
				</div>
			</Link>
		</li>
	);
}
