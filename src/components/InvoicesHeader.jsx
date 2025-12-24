import { Popover, Checkbox, Label } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import InvoiceDialog from './InvoiceDialog';
import ArrowDown from './ui/ArrowDown';
import PlusSign from './ui/PlusSign';

export default function InvoicesHeader({ invoices, filters, handleFilters }) {
	return (
		<div className="flex items-center gap-4.5 md:gap-10">
			<div className="mr-auto">
				<h1 className="text-2xl font-bold md:text-4xl">Invoices</h1>
				<p className="text-06 text-[13px]">{invoices.length} invoices</p>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild>
					<button
						className="flex cursor-pointer items-center gap-3 text-[15px] font-bold md:gap-3.5"
						aria-label="Filter invoices by status"
					>
						<span className="md:hidden">Filter</span>
						<span className="hidden md:inline">Filter by status</span>
						<ArrowDown />
					</button>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content sideOffset={5}>
						<div className="dark:bg-04 grid w-48 gap-4 rounded-lg bg-white p-6 font-bold drop-shadow-2xl dark:text-white">
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
						<Popover.Arrow className="fill-01" />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			<InvoiceDialog action="addInvoice">
				<button className="bg-01 hover:bg-02 flex w-[90px] cursor-pointer items-center gap-2 rounded-3xl p-2 text-[15px] font-bold text-white md:w-[150px] md:gap-4">
					<div className="grid size-8 place-content-center rounded-full bg-white">
						<PlusSign />
					</div>
					<span className="md:hidden">New</span>
					<span className="hidden md:inline">New Invoice</span>
				</button>
			</InvoiceDialog>
		</div>
	);
}

function CheckboxFilter({ id, label, filters, handleFilters }) {
	return (
		<fieldset className="flex gap-[13px]">
			<Checkbox.Root
				id={id}
				checked={filters.includes(id)}
				onCheckedChange={() => handleFilters(id)}
				className="bg-05 dark:bg-03 data-[state=checked]:bg-01 hover:dark:border-01 flex size-4 items-center justify-center rounded-xs border border-transparent p-1 hover:border-[#979797] data-[state=checked]:border-0"
			>
				<Checkbox.Indicator className="text-white">
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<Label.Root htmlFor={id}>{label}</Label.Root>
		</fieldset>
	);
}
