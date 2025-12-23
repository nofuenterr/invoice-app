import { Dialog, ScrollArea, Label, Select } from 'radix-ui';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import generateRandomId from '../utils/generateRandomId';
import { addDays, format } from 'date-fns';
import { useEffect } from 'react';
import { mapInvoiceToForm } from '../utils/mapInvoiceToForm';
import { useInvoiceStore } from '../stores/invoiceStore';

export default function InvoiceDialog({ children, action, invoice }) {
	const { control, trigger, reset, handleSubmit } = useFormContext();
	const addInvoice = useInvoiceStore((s) => s.addInvoice);
	const editInvoice = useInvoiceStore((s) => s.editInvoice);

	useEffect(() => {
		if (action === 'editInvoice' && invoice) reset(mapInvoiceToForm(invoice));
		if (action === 'addInvoice') reset({ items: [] });
	}, [action, invoice, reset]);

	const {
		fields: itemFields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'items',
	});

	const submitData = async (data, event) => {
		const isValid = await trigger(undefined, { shouldFocus: true });

		if (isValid) {
			const cleanData = {
				createdAt: data.createdAt,
				paymentDue: format(
					addDays(new Date(data.createdAt), data.paymentTerms),
					'y-MM-dd'
				),
				description: data.description,
				paymentTerms: data.paymentTerms,
				clientName: data.clientName,
				clientEmail: data.clientEmail,
				senderAddress: {
					street: data.senderStreet,
					city: data.senderCity,
					postCode: data.senderPostCode,
					country: data.senderCountry,
				},
				clientAddress: {
					street: data.clientStreet,
					city: data.clientCity,
					postCode: data.clientPostCode,
					country: data.clientCountry,
				},
				items: data.items,
				total: data.total,
			};

			const intent = event.nativeEvent.submitter.value;
			const status = intent === 'pending' ? 'pending' : 'draft';

			if (action === 'addInvoice') {
				cleanData.id = generateRandomId();
				cleanData.status = status;
				addInvoice(cleanData);
				console.log('Added new invoice', cleanData);
			}
			if (action === 'editInvoice') {
				cleanData.id = invoice.id;
				cleanData.status = invoice.status;
				editInvoice(cleanData);
				console.log('Edited invoice', cleanData);
			}

			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		}
	};

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				if (!open && action === 'addInvoice') reset({ items: [] });
			}}
			className="absolute top-0 left-0"
		>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="bg-06 fixed inset-0" />

				<Dialog.Content className="bg-05 fixed top-0 left-0 h-dvh w-72">
					<Dialog.Close asChild>
						<button>Go back</button>
					</Dialog.Close>

					<Dialog.Title>
						{action === 'addInvoice'
							? 'New'
							: `Edit #${invoice.id.toUpperCase()}`}{' '}
						Invoice
					</Dialog.Title>
					<Dialog.Description>
						{action === 'addInvoice'
							? 'Add new invoice'
							: `Edit invoice with ID #${invoice.id.toUpperCase()}`}
					</Dialog.Description>

					<form onSubmit={handleSubmit(submitData)}>
						<ScrollArea.Root className="h-full overflow-scroll">
							<ScrollArea.Viewport className="ScrollAreaViewport">
								<fieldset>
									<h3>Bill From</h3>
									<div>
										<FormInput
											name="senderStreet"
											label="Street Address"
											placeholder="19 Union Terrace"
										/>
										<FormInput
											name="senderCity"
											label="City"
											placeholder="London"
										/>
										<FormInput
											name="senderPostCode"
											label="Post Code"
											placeholder="E1 3EZ"
										/>
										<FormInput
											name="senderCountry"
											label="Country"
											placeholder="United Kingdom"
										/>
									</div>
								</fieldset>

								<fieldset>
									<h3>Bill To</h3>
									<div>
										<FormInput
											name="clientName"
											label="Client's Name"
											placeholder="Alex Grim"
										/>
										<FormInput
											name="clientEmail"
											label="Client's Email"
											placeholder="alexgrim@mail.com"
											type="email"
										/>
										<FormInput
											name="clientStreet"
											label="Street Address"
											placeholder="Bradford"
										/>
										<FormInput
											name="clientCity"
											label="City"
											placeholder="Bradford"
										/>
										<FormInput
											name="clientPostCode"
											label="Post Code"
											placeholder="BD1 9PB"
										/>
										<FormInput
											name="clientCountry"
											label="Country"
											placeholder="United Kingdom"
										/>
									</div>
								</fieldset>

								<fieldset>
									<FormInput
										name="createdAt"
										label="Invoice Date"
										type="date"
									/>
									<div>
										<Label.Root htmlFor="paymentTerms">
											Payment Terms
										</Label.Root>
										<Controller
											id="paymentTerms"
											name="paymentTerms"
											control={control}
											defaultValue={7}
											render={({ field }) => (
												<Select.Root
													value={Number(field.value)}
													onValueChange={(value) =>
														field.onChange(Number(value))
													}
												>
													<Select.Trigger className="inline-flex h-10 w-40 items-center justify-between rounded-md border px-3 text-sm focus:ring-2 focus:outline-none">
														<Select.Value placeholder="Select payment term" />
													</Select.Trigger>

													<Select.Portal>
														<Select.Content className="z-50 min-w-48 rounded-md border shadow-md">
															<Select.Viewport className="p-1">
																<SelectItem value={1} text="Net 1 Day" />
																<SelectItem value={7} text="Net 7 Days" />
																<SelectItem value={14} text="Net 14 Days" />
																<SelectItem value={30} text="Net 30 Days" />
															</Select.Viewport>
														</Select.Content>
													</Select.Portal>
												</Select.Root>
											)}
										/>
									</div>
									<FormInput
										name="description"
										label="Project Description"
										placeholder="Graphic Design"
									/>
								</fieldset>

								<fieldset>
									<h3>Item List</h3>
									<ul>
										{itemFields.map((field, index) => (
											<InvoiceItem
												key={field.id}
												index={index}
												remove={remove}
											/>
										))}
									</ul>
									<button
										type="button"
										onClick={() =>
											append({
												name: '',
												quantity: 1,
												price: 0,
												total: 0,
											})
										}
									>
										+ Add New Item
									</button>
								</fieldset>
							</ScrollArea.Viewport>

							<ScrollArea.Scrollbar
								className="ScrollAreaScrollbar"
								orientation="vertical"
							>
								<ScrollArea.Thumb className="ScrollAreaThumb" />
							</ScrollArea.Scrollbar>

							<ScrollArea.Corner />
						</ScrollArea.Root>

						<div>
							<Dialog.Close asChild>
								<button
									type="button"
									aria-label={
										action === 'addInvoice'
											? 'Discard new invoice'
											: 'Cancel edit'
									}
								>
									{action === 'addInvoice' ? 'Discard' : 'Cancel'}
								</button>
							</Dialog.Close>

							<button
								type="submit"
								name="intent"
								value="draft"
								aria-label="Save as draft"
								className={action === 'addInvoice' ? 'inline-block' : 'hidden'}
							>
								Save as Draft
							</button>

							<button
								type="submit"
								name="intent"
								value="pending"
								aria-label={
									action === 'addInvoice' ? 'Save & Send' : 'Save Changes'
								}
							>
								{action === 'addInvoice' ? 'Save & Send' : 'Save Changes'}
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function FormInput({ name, label, placeholder, type = 'text' }) {
	const { register } = useFormContext();

	return (
		<div>
			<Label.Root htmlFor={name}>{label}</Label.Root>
			<input
				{...register(name)}
				type={type}
				id={name}
				placeholder={placeholder}
			/>
		</div>
	);
}

function SelectItem({ value, text }) {
	return (
		<Select.Item
			className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm focus:outline-none data-highlighted:ring-2"
			value={value}
		>
			<Select.ItemText>{text}</Select.ItemText>
		</Select.Item>
	);
}

function InvoiceItem({ index, remove }) {
	const { register, watch } = useFormContext();
	const quantity = watch(`items.${index}.quantity`);
	const price = watch(`items.${index}.price`);
	const total = quantity * price;

	return (
		<li>
			<div>
				<Label.Root>
					<p>Item Name</p>
					<input
						{...register(`items.${index}.name`)}
						placeholder="Banner Design"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root>
					<p>Qty.</p>
					<input
						{...register(`items.${index}.quantity`, { valueAsNumber: true })}
						type="number"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root>
					<p>Price</p>
					<input
						{...register(`items.${index}.price`, { valueAsNumber: true })}
						type="number"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root>
					<p>Total</p>
					<input value={total} type="number" disabled />
				</Label.Root>
			</div>
			<button type="button" onClick={() => remove(index)}>
				Delete
			</button>
		</li>
	);
}
