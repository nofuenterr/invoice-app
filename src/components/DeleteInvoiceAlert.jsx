import { AlertDialog } from 'radix-ui';

export default function DeleteInvoiceAlert({
	children,
	id,
	deleteInvoice,
	navigate,
}) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay />
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete invoice #{id}? This action cannot be
						undone.
					</AlertDialog.Description>
					<div className="flex justify-end gap-6">
						<AlertDialog.Cancel asChild>
							<button>Cancel</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="bg-09"
								onClick={() => {
									deleteInvoice(id);
									navigate(-1);
								}}
							>
								Delete
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
