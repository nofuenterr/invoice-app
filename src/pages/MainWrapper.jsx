import { Outlet } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from '../stores/themeStore';
import { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';

const money = z
	.number()
	.positive('price must be greater than 0')
	.refine(
		(v) => Number.isInteger(v * 100),
		'price can have at most 2 decimal places'
	);

const quantity = z
	.number()
	.int('quantity must be an integer')
	.min(1, 'quantity must be at least 1');

const invoiceItemSchema = z.object({
	name: z.string().min(1, "can't be empty"),
	quantity,
	price: money,
});

const formSchema = z
	.object({
		createdAt: z.string().min(1, "can't be empty"),
		description: z.string().optional(),
		paymentTerms: z
			.union([z.literal(1), z.literal(7), z.literal(14), z.literal(30)])
			.default(7),
		clientName: z.string().min(1, "can't be empty"),
		clientEmail: z.email('invalid email address').optional(),
		status: z.enum(['draft', 'pending', 'paid']).default('draft'),
		senderStreet: z.string().optional(),
		senderCity: z.string().optional(),
		senderPostCode: z.string().optional(),
		senderCountry: z.string().optional(),
		clientStreet: z.string().optional(),
		clientCity: z.string().optional(),
		clientPostCode: z.string().optional(),
		clientCountry: z.string().optional(),
		items: z
			.array(invoiceItemSchema)
			.min(1, 'at least one item is required')
			.transform((items) =>
				items.map((item) => ({
					...item,
					total: item.quantity * item.price,
				}))
			),
	})
	.transform((data) => ({
		...data,
		total: data.items.reduce((sum, item) => sum + item.total, 0),
	}));

export default function MainWrapper() {
	const dark = useThemeStore((s) => s.dark);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark);
	}, [dark]);

	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	return (
		<div className="bg-11 dark:bg-12 text-08 grid h-dvh grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr] dark:text-white">
			<HeaderBar />
			<FormProvider {...form}>
				<Outlet />
			</FormProvider>
		</div>
	);
}
