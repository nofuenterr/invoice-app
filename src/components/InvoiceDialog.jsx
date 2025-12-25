import { Dialog, Label, Select } from 'radix-ui';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import generateRandomId from '../utils/generateRandomId';
import { addDays, format } from 'date-fns';
import { useEffect } from 'react';
import { mapInvoiceToForm } from '../utils/mapInvoiceToForm';
import { useInvoiceStore } from '../stores/invoiceStore';
import ArrowLeft from './ui/ArrowLeft';
import ArrowDown from './ui/ArrowDown';
import DeleteIcon from './ui/DeleteIcon';
import ScrollArea from './ScrollArea';

export default function InvoiceDialog({ children, action, invoice }) {
	const {
		control,
		trigger,
		reset,
		handleSubmit,
		formState: { errors },
	} = useFormContext();
	const addInvoice = useInvoiceStore((s) => s.addInvoice);
	const editInvoice = useInvoiceStore((s) => s.editInvoice);

	Object.entries(errors).forEach((field) => {
		console.log(field);
	});

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
				<Dialog.Overlay className="bg-overlay fixed inset-0" />

				<Dialog.Content className="dark:bg-12 text-08 fixed top-0 left-0 z-20 h-dvh w-full overflow-visible bg-white md:max-w-154 md:rounded-tr-[20px] md:rounded-br-[20px] lg:max-w-180 dark:text-white">
					<form
						onSubmit={handleSubmit(submitData)}
						className="flex h-full flex-col"
					>
						<div className="grid flex-1 gap-5.5 overflow-hidden px-6 py-8 md:gap-11.5 md:px-14 md:py-15">
							<div className="grid justify-items-start gap-6.5">
								<Dialog.Close asChild>
									<button className="flex items-center gap-6 text-[15px] font-bold md:hidden">
										<ArrowLeft />
										<span>Go back</span>
									</button>
								</Dialog.Close>
								<Dialog.Title className="text-2xl font-bold">
									{action === 'addInvoice' ? (
										<span>New Invoice</span>
									) : (
										<span>
											Edit <span className="text-06">#</span>$
											{invoice.id.toUpperCase()} Invoice
										</span>
									)}
								</Dialog.Title>

								<Dialog.Description className="hidden">
									{action === 'addInvoice'
										? 'Add new invoice'
										: `Edit invoice with ID #${invoice.id.toUpperCase()}`}
								</Dialog.Description>
							</div>

							<ScrollArea flex="flex-1">
								<div className="grid gap-17">
									<div className="grid gap-10">
										<fieldset className="grid gap-6">
											<h3 className="text-01 text-[15px] font-bold">
												Bill From
											</h3>
											<div className="grid grid-cols-2 gap-6 md:grid-cols-3">
												<FormInput
													name="senderStreet"
													label="Street Address"
													placeholder="19 Union Terrace"
													area="col-start-1 -col-end-1"
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
													area="col-start-1 -col-end-1 md:col-start-3"
												/>
											</div>
										</fieldset>
										<fieldset className="grid gap-6">
											<h3 className="text-01 text-[15px] font-bold">Bill To</h3>
											<div className="grid grid-cols-2 gap-6 md:grid-cols-3">
												<FormInput
													name="clientName"
													label="Client's Name"
													placeholder="Alex Grim"
													area="col-start-1 -col-end-1"
												/>
												<FormInput
													name="clientEmail"
													label="Client's Email"
													placeholder="alexgrim@mail.com"
													type="email"
													area="col-start-1 -col-end-1"
												/>
												<FormInput
													name="clientStreet"
													label="Street Address"
													placeholder="Bradford"
													area="col-start-1 -col-end-1"
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
													area="col-start-1 -col-end-1 md:col-start-3"
												/>
											</div>
										</fieldset>
										<fieldset className="grid gap-6 md:grid-cols-2">
											<FormInput
												name="createdAt"
												label="Invoice Date"
												type="date"
											/>
											<div className="grid gap-2.5">
												<Label.Root
													className="text-07 dark:text-06"
													htmlFor="paymentTerms"
												>
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
															<Select.Trigger className="hover:border-02 hover:dark:border-01 border-05 dark:bg-03 dark:border-04 grid justify-start rounded-sm border bg-white px-5 py-4 text-[15px] font-bold focus:outline-none">
																<Select.Value placeholder="Select payment term" />
															</Select.Trigger>
															<Select.Portal>
																<Select.Content className="z-50 w-full shadow-md">
																	<Select.Viewport className="dark:bg-04 *:not-last:border-b-05 *:not-last:dark:border-b-03 grid w-full rounded-lg bg-white *:not-last:border-b">
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
												area="col-start-1 -col-end-1"
											/>
										</fieldset>
									</div>
									<fieldset className="grid gap-6">
										<h3
											className={
												'text-16 text-lg font-bold ' +
												(itemFields.length === 0 ? 'hidden' : 'block')
											}
										>
											Item List
										</h3>
										<div className="grid gap-12">
											<ul
												className={
													'gap-12 ' +
													(itemFields.length === 0 ? 'hidden' : 'grid')
												}
											>
												{itemFields.map((field, index) => (
													<InvoiceItem
														key={field.id}
														index={index}
														remove={remove}
													/>
												))}
											</ul>
											<button
												className="bg-17 text-07 dark:bg-04 dark:text-06 hover:bg-05 hover:text-07 hover:dark:text-05 hover:dark:bg-04 cursor-pointer rounded-3xl p-4 text-[15px] font-bold"
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
										</div>
									</fieldset>
								</div>

								{Object.keys(errors).length > 0 ? (
									<div className="text-09 mt-8">
										{(Object.keys(errors).length > 1 ||
											(Object.keys(errors).length === 1 &&
												!errors?.items?.message)) && (
											<p>- All fields must be added</p>
										)}
										{errors?.items?.message && <p>- An item must be added</p>}
									</div>
								) : null}
							</ScrollArea>
						</div>

						<div className="dark:bg-03 relative flex items-center justify-end gap-2 bg-white px-6 py-5 md:rounded-tr-[20px] md:rounded-br-[20px] md:px-14 md:py-8">
							<Dialog.Close asChild>
								<button
									className="bg-15 text-07 hover:bg-05 dark:bg-04 hover:dark:bg-15 hover:dark:text-07 dark:text-05 cursor-pointer rounded-3xl px-6 py-4 text-[15px] font-bold"
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
								className={
									'bg-draft hover:bg-08 hover:dark:bg-04 text-06 dark:bg-13 dark:text-05 ml-auto cursor-pointer rounded-3xl px-6 py-4 text-[15px] font-bold ' +
									(action === 'addInvoice' ? 'inline-block' : 'hidden')
								}
							>
								Save as Draft
							</button>

							<button
								type="submit"
								name="intent"
								value="pending"
								className="bg-01 hover:bg-02 cursor-pointer rounded-3xl px-6 py-4 text-[15px] font-bold text-white"
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

function FormInput({ name, label, placeholder, type = 'text', area }) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className={'grid gap-2.5 ' + area}>
			<div
				className={
					'flex items-end justify-between gap-2 ' +
					(errors?.[name] ? ' text-09' : '')
				}
			>
				<Label.Root
					htmlFor={name}
					className={
						'text-07 dark:text-06 ' +
						(errors?.[name] ? ' text-09 dark:text-09' : '')
					}
				>
					{label}
				</Label.Root>
				<span className="text-end">{errors?.[name]?.message}</span>
			</div>
			<input
				{...register(name)}
				type={type}
				id={name}
				placeholder={placeholder}
				className={
					'border-05 dark:bg-03 dark:border-04 hover:border-02 hover:dark:border-01 min-w-28 rounded-sm border bg-white px-5 py-4 text-[15px] font-bold ' +
					(errors?.[name] ? 'border-09' : '')
				}
			/>
		</div>
	);
}

function SelectItem({ value, text }) {
	return (
		<Select.Item
			className="text-08 hover:text-01 dark:text-05 hover:dark:text-02 focus:text-01 focus:dark:text-02 cursor-pointer px-6 py-4 text-[15px] font-bold focus:outline-none focus-visible:outline-none"
			value={value}
		>
			<Select.ItemText>{text}</Select.ItemText>
		</Select.Item>
	);
}

function InvoiceItem({ index, remove }) {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();
	const quantity = watch(`items.${index}.quantity`);
	const price = watch(`items.${index}.price`);
	const total = quantity * price;

	return (
		<li className="grid grid-cols-[0.64fr_1fr_1fr_auto] items-end gap-6 md:grid-cols-[4fr_0.4fr_1fr_1fr_auto]">
			<div className="col-span-4 md:col-span-1">
				<Label.Root className="grid gap-4">
					<p className="text-07 dark:text-06">Item Name</p>
					<input
						className={
							'border-05 dark:bg-03 dark:border-04 min-w-25 rounded-sm border bg-white px-5 py-4 text-[15px] font-bold ' +
							(errors?.items?.[index]?.name?.message
								? 'border-09 dark:border-09'
								: '')
						}
						{...register(`items.${index}.name`)}
						placeholder="Banner Design"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root className="grid gap-4">
					<p className="text-07 dark:text-06">Qty.</p>
					<input
						className={
							'no-spinner border-05 dark:bg-03 dark:border-04 min-w-13 rounded-sm border bg-white px-5 py-4 text-[15px] font-bold ' +
							(errors?.items?.[index]?.quantity?.message
								? 'border-09 dark:border-09'
								: '')
						}
						{...register(`items.${index}.quantity`, { valueAsNumber: true })}
						type="number"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root className="grid gap-4">
					<p className="text-07 dark:text-06">Price</p>
					<input
						className={
							'no-spinner border-05 dark:bg-03 dark:border-04 min-w-25 rounded-sm border bg-white px-5 py-4 text-[15px] font-bold ' +
							(errors?.items?.[index]?.price?.message
								? 'border-09 dark:border-09'
								: '')
						}
						{...register(`items.${index}.price`, { valueAsNumber: true })}
						type="number"
					/>
				</Label.Root>
			</div>
			<div>
				<Label.Root className="grid gap-4">
					<p className="text-07 dark:text-06">Total</p>
					<input
						className="no-spinner text-06 grid min-w-25 rounded-sm bg-transparent px-5 py-4 text-[15px] font-bold"
						value={total}
						type="number"
						disabled
					/>
				</Label.Root>
			</div>
			<button
				className="mb-4 cursor-pointer"
				type="button"
				onClick={() => remove(index)}
			>
				<DeleteIcon />
			</button>
		</li>
	);
}
