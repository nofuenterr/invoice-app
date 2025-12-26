import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '../stores/invoiceStore';
import InvoiceDialog from '../components/InvoiceDialog';
import DeleteInvoiceAlert from '../components/DeleteInvoiceAlert';
import ArrowLeft from '../components/ui/ArrowLeft';
import StatusBlock from '../components/StatusBlock';
import ScrollArea from '../components/ScrollArea';
import { format } from 'date-fns';
import formatPrice from '../utils/formatPrice';

export default function ViewInvoice() {
	const params = useParams();
	const navigate = useNavigate();
	const invoice = useInvoiceStore((s) => s.getInvoice(params.invoiceId));

	if (!invoice) return <div>Invoice not found</div>;

	return (
		<div className="flex w-full flex-col items-center gap-4 overflow-hidden">
			<div className="grid grid-cols-[minmax(0,576px)] gap-8 overflow-hidden px-6 py-8 md:grid-cols-[minmax(0,672px)] md:px-10 md:py-12 lg:grid-cols-[minmax(0,730px)] lg:px-14 lg:py-16">
				<button
					className="hover:**:stroke-02 hover:text-02 hover:dark:text-06 flex cursor-pointer items-center gap-6 text-[15px] font-bold"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft />
					<span>Go back</span>
				</button>
				<div className="grid gap-8 overflow-hidden md:gap-6">
					<div className="dark:bg-03 rounded-lg bg-white p-6 md:flex md:items-center md:justify-between md:px-8 md:py-5">
						<div className="flex items-center justify-between gap-5">
							<p className="text-06 dark:text-05">Status</p>
							<StatusBlock status={invoice.status} />
						</div>
						<ButtonGroup
							invoice={invoice}
							id={params.invoiceId}
							navigate={navigate}
							visibilityStyles="hidden md:flex"
							justify="justify-end"
						/>
					</div>
					<ScrollArea>
						<div className="dark:bg-03 grid gap-10 rounded-lg bg-white p-6 md:gap-12 md:p-8 lg:p-12">
							<div className="grid gap-8 md:gap-5">
								<div className="grid items-start gap-8 md:flex md:justify-between">
									<div className="grid gap-1 md:gap-2">
										<p className="text-08 text-[15px] font-bold dark:text-white">
											<span className="text-07 dark:text-06">#</span>
											{invoice.id}
										</p>
										<p className="text-07 dark:text-05 text-[13px] text-balance">
											{invoice.description}
										</p>
									</div>
									<div className="text-07 dark:text-05 grid gap-1 text-[13px] md:text-end">
										<p>{invoice.senderAddress.street}</p>
										<p>{invoice.senderAddress.city}</p>
										<p>{invoice.senderAddress.postCode}</p>
										<p>{invoice.senderAddress.country}</p>
									</div>
								</div>
								<div className="flex flex-wrap items-start gap-10 md:gap-32">
									<div className="grid grid-cols-2 grid-rows-2 gap-x-15 gap-y-8 md:gap-x-32">
										<div className="grid gap-3">
											<p className="text-07 dark:text-05">Invoice Date</p>
											<p className="text-[15px] font-bold">
												{format(new Date(invoice.createdAt), 'dd MMM yyyy')}
											</p>
										</div>
										<div className="col-start-2 row-start-1 row-end-3 grid content-start gap-3">
											<p className="text-07 dark:text-05">Bill To</p>
											<div className="grid gap-2">
												<p className="text-[15px] font-bold">
													{invoice.clientName}
												</p>
												<div className="text-07 dark:text-05 grid gap-1">
													<p>{invoice.clientAddress.street}</p>
													<p>{invoice.clientAddress.city}</p>
													<p>{invoice.clientAddress.postCode}</p>
													<p>{invoice.clientAddress.country}</p>
												</div>
											</div>
										</div>
										<div className="grid gap-3">
											<p className="text-07 dark:text-05">Payment Due</p>
											<p className="text-[15px] font-bold">
												{format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
											</p>
										</div>
									</div>
									<div className="grid gap-3">
										<p className="text-07 dark:text-05">Sent to</p>
										<p className="text-[15px] font-bold">
											{invoice.clientEmail}
										</p>
									</div>
								</div>
							</div>
							<div className="overflow-hidden rounded-lg">
								<ul className="bg-15 dark:bg-04 grid gap-6 p-6 md:gap-8 md:p-8">
									{invoice.items.map((item, index) => {
										return (
											<li
												className="flex items-center justify-between gap-4 text-[15px] font-bold"
												key={`${index} - ${item}`}
											>
												<div className="grid gap-2">
													<p className="text-balance">{item.name}</p>
													<p className="text-07 dark:text-05">
														{item.quantity} x £ {formatPrice(item.price)}
													</p>
												</div>
												<p className="text-nowrap">
													£ {formatPrice(item.total)}
												</p>
											</li>
										);
									})}
								</ul>
								<div className="bg-13 dark:bg-08 flex items-center justify-between p-6 text-white md:px-8">
									<p>Grand Total</p>
									<p className="text-2xl font-bold">
										£ {formatPrice(invoice.total)}
									</p>
								</div>
							</div>
						</div>
					</ScrollArea>
				</div>
			</div>
			<ButtonGroup
				invoice={invoice}
				id={params.invoiceId}
				navigate={navigate}
				visibilityStyles="md:hidden"
				justify="justify-center"
			/>
		</div>
	);
}

function ButtonGroup({ invoice, id, navigate, visibilityStyles, justify }) {
	const deleteInvoice = useInvoiceStore((s) => s.deleteInvoice);
	const markInvoiceAsPaid = useInvoiceStore((s) => s.markInvoiceAsPaid);

	return (
		<div
			className={
				'dark:bg-03 flex w-full items-center gap-2 bg-white p-6 text-[15px] font-bold md:p-0 ' +
				visibilityStyles +
				' ' +
				justify
			}
		>
			<InvoiceDialog action="editInvoice" invoice={invoice}>
				<button className="bg-15 dark:bg-04 hover:bg-05 text-07 dark:text-05 hover:dark:text-07 cursor-pointer rounded-3xl px-6 py-4 hover:dark:bg-white">
					Edit
				</button>
			</InvoiceDialog>
			<DeleteInvoiceAlert
				id={id}
				deleteInvoice={deleteInvoice}
				navigate={navigate}
			>
				<button className="bg-09 hover:bg-10 cursor-pointer rounded-3xl px-6 py-4 text-white">
					Delete
				</button>
			</DeleteInvoiceAlert>
			<button
				className="bg-01 hover:bg-02 cursor-pointer rounded-3xl px-6 py-4 text-white"
				onClick={() => markInvoiceAsPaid(id)}
			>
				Mark as Paid
			</button>
		</div>
	);
}
