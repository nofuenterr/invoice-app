import { Popover, Checkbox, Label } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import InvoiceDialog from './InvoiceDialog';

export default function InvoicesHeader({ invoices, filters, handleFilters }) {
	return (
		<div>
			<div>
				<h1>Invoices</h1>
				<p>{invoices.length} invoices</p>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild>
					<button aria-label="Filter invoices by status">Filter</button>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content sideOffset={5}>
						<div className="bg-02 flex flex-col gap-2.5">
							<CheckboxFilter
								id="draft"
								label="Draft"
								filters={filters}
								handleFilters={handleFilters}
							/>
							<CheckboxFilter
								id="pending"
								label="Pending"
								filters={filters}
								handleFilters={handleFilters}
							/>
							<CheckboxFilter
								id="paid"
								label="Paid"
								filters={filters}
								handleFilters={handleFilters}
							/>
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

function CheckboxFilter({ id, label, filters, handleFilters }) {
	return (
		<fieldset>
			<Checkbox.Root
				id={id}
				checked={filters.includes(id)}
				onCheckedChange={() => handleFilters(id)}
			>
				<Checkbox.Indicator>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<Label.Root htmlFor={id}>{label}</Label.Root>
		</fieldset>
	);
}
