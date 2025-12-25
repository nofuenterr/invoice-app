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
				<AlertDialog.Overlay className="bg-overlay fixed inset-0" />
				<AlertDialog.Content className="dark:bg-03 fixed top-1/2 left-1/2 z-20 grid w-4/5 max-w-120 -translate-x-1/2 -translate-y-1/2 gap-5.5 rounded-lg bg-white p-8 md:gap-3.5 md:p-12">
					<div className="grid gap-2 md:gap-3">
						<AlertDialog.Title className="text-08 text-2xl font-bold dark:text-white">
							Confirm Deletion
						</AlertDialog.Title>
						<AlertDialog.Description className="text-06 dark:text-05">
							Are you sure you want to delete invoice #{id}? This action cannot
							be undone.
						</AlertDialog.Description>
					</div>
					<div className="flex justify-end gap-2 text-[15px] font-bold">
						<AlertDialog.Cancel asChild>
							<button className="bg-17 hover:bg-05 hover:dark:text-07 text-07 dark:text-05 dark:bg-04 cursor-pointer rounded-3xl px-6 py-4 hover:dark:bg-white">
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								className="bg-09 hover:bg-10 cursor-pointer rounded-3xl px-6 py-4 text-white"
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
