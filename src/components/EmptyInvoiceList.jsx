export default function EmptyInvoiceList() {
	return (
		<div className="mx-auto grid max-w-60 place-content-center justify-items-center gap-10 text-center md:gap-16">
			<div>
				<img
					src="/src/assets/ui/illustration-empty.svg"
					alt="Empty invoice list illustration"
				/>
			</div>
			<div className="grid gap-6">
				<h2 className="text-2xl font-bold">There is nothing here</h2>
				<p className="text-06 dark:text-05 text-balance">
					Create an invoice by clicking the New button and get started
				</p>
			</div>
		</div>
	);
}
