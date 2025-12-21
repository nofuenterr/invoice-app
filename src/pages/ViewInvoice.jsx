import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '../stores/invoiceStore';

export default function ViewInvoice() {
	const params = useParams();
	const navigate = useNavigate();
	const getInvoice = useInvoiceStore((s) => s.getInvoice);
	const invoice = getInvoice(params.invoiceId);

	if (!invoice) return <div>Invoice not found</div>;

	return (
		<div>
			<div>
				<div>
					<button className="cursor-pointer" onClick={() => navigate(-1)}>
						{/* arrow left */}Go back
					</button>
				</div>
				<div>
					<div>
						<p>Status</p>
						<div>
							{/* status indicator */}
							{invoice.status}
						</div>
					</div>
					{/* <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Mark as Paid</button>
          </div> */}
				</div>
				<div>
					<div>
						<div>
							<p>{invoice.id}</p>
							<p>{invoice.description}</p>
						</div>
						<div>
							<p>{invoice.senderAddress.street}</p>
							<p>{invoice.senderAddress.city}</p>
							<p>{invoice.senderAddress.postCode}</p>
							<p>{invoice.senderAddress.country}</p>
						</div>
					</div>
					<div>
						<div>
							<p>Invoice Date</p>
							<p>{invoice.createdAt}</p>
						</div>
						<div>
							<p>Payment Due</p>
							<p>{invoice.paymentDue}</p>
						</div>
						<div>
							<p>Bill To</p>
							<div>
								<p>{invoice.clientName}</p>
								<div>
									<p>{invoice.clientAddress.street}</p>
									<p>{invoice.clientAddress.city}</p>
									<p>{invoice.clientAddress.postCode}</p>
									<p>{invoice.clientAddress.country}</p>
								</div>
							</div>
						</div>
						<div>
							<p>Sent to</p>
							<p>{invoice.clientEmail}</p>
						</div>
					</div>
				</div>
				<div>
					<ul>
						{invoice.items.map((item, index) => {
							return (
								<li key={index - item}>
									<div>
										<p>{item.name}</p>
										<p>
											{item.quantity} x £ {item.price}
										</p>
									</div>
									<p>£ {item.total}</p>
								</li>
							);
						})}
					</ul>
					<div>
						<p>Grand Total</p>
						<p>£ {invoice.total}</p>
					</div>
				</div>
			</div>
			<div>
				<button>Edit</button>
				<button>Delete</button>
				<button>Mark as Paid</button>
			</div>
		</div>
	);
}
