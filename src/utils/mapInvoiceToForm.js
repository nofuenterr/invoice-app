export function mapInvoiceToForm(invoice) {
	if (!invoice) return undefined;

	return {
		id: invoice.id,
		createdAt: invoice.createdAt,
		description: invoice.description,
		paymentTerms: invoice.paymentTerms,

		clientName: invoice.clientName,
		clientEmail: invoice.clientEmail,

		status: invoice.status,

		senderStreet: invoice.senderAddress.street,
		senderCity: invoice.senderAddress.city,
		senderPostCode: invoice.senderAddress.postCode,
		senderCountry: invoice.senderAddress.country,

		clientStreet: invoice.clientAddress.street,
		clientCity: invoice.clientAddress.city,
		clientPostCode: invoice.clientAddress.postCode,
		clientCountry: invoice.clientAddress.country,

		items: invoice.items.map((item) => ({
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			total: item.quantity * item.price,
		})),
	};
}
