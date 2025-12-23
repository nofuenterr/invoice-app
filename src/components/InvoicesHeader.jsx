import { Popover, Checkbox, Label } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import { useInvoiceStore } from '../stores/invoiceStore';
import InvoiceDialog from './InvoiceDialog';

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
							<CheckboxFilter id="draft" label="Draft" />
							<CheckboxFilter id="pending" label="Pending" />
							<CheckboxFilter id="paid" label="Paid" />
						</div>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			<InvoiceDialog action="addInvoice">
				<button>
					<div>+</div>
					<span>New</span>
				</button>
			</InvoiceDialog>
		</div>
	);
}

function CheckboxFilter({ id, label }) {
	return (
		<fieldset>
			<Checkbox.Root id={id}>
				<Checkbox.Indicator>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<Label.Root htmlFor={id}>{label}</Label.Root>
		</fieldset>
	);
}
