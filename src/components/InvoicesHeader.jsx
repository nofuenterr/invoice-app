import { Popover, Checkbox, Label } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import { useInvoiceStore } from '../stores/invoiceStore';

export default function InvoicesHeader() {
	const invoiceList = useInvoiceStore((s) => s.invoiceList);

	return (
		<div>
			<div>
				<h1>Invoices</h1>
				<p>{invoiceList.length} invoices</p>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild>
					<button aria-label="Filter invoices by status">Filter</button>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content sideOffset={5}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							<fieldset>
								<Checkbox.Root id="draft">
									<Checkbox.Indicator>
										<CheckIcon />
									</Checkbox.Indicator>
								</Checkbox.Root>
								<Label.Root htmlFor="draft">Draft</Label.Root>
							</fieldset>
							<fieldset>
								<Checkbox.Root id="pending">
									<Checkbox.Indicator>
										<CheckIcon />
									</Checkbox.Indicator>
								</Checkbox.Root>
								<Label.Root htmlFor="pending">Pending</Label.Root>
							</fieldset>
							<fieldset>
								<Checkbox.Root id="paid">
									<Checkbox.Indicator>
										<CheckIcon />
									</Checkbox.Indicator>
								</Checkbox.Root>
								<Label.Root htmlFor="paid">Paid</Label.Root>
							</fieldset>
						</div>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			<button>
				<div>+</div>
				<span>New</span>
			</button>
		</div>
	);
}
