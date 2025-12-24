import { Outlet } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from '../stores/themeStore';
import { useEffect } from 'react';
import HeaderBar from '../components/HeaderBar';

const formSchema = z
	.object({
		createdAt: z.string().min(1, 'This field is required'),
		description: z.string().min(1, 'This field is required'),
		paymentTerms: z.union([
			z.literal(1),
			z.literal(7),
			z.literal(14),
			z.literal(30),
		]),
		clientName: z
			.string()
			.min(3, 'Your name must be at least 3 characters long'),
		clientEmail: z.email('Invalid email address'),
		status: z.enum(['draft', 'pending', 'paid']).default('draft'),
		senderStreet: z.string().min(1, 'This field is required'),
		senderCity: z.string().min(1, 'This field is required'),
		senderPostCode: z.string().min(1, 'This field is required'),
		senderCountry: z.string().min(1, 'This field is required'),
		clientStreet: z.string().min(1, 'This field is required'),
		clientCity: z.string().min(1, 'This field is required'),
		clientPostCode: z.string().min(1, 'This field is required'),
		clientCountry: z.string().min(1, 'This field is required'),
		items: z
			.array(
				z.object({
					name: z.string(),
					quantity: z.number(),
					price: z.number(),
				})
			)
			.transform((data) => {
				const newData = [...data].map((item) => {
					return {
						...item,
						total: item.quantity * item.price,
					};
				});
				return newData;
			}),
	})
	.transform((data) => {
		return {
			...data,
			total: data.items.reduce((total, item) => {
				return total + item.total;
			}, 0),
		};
	});

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
		<div className="bg-11 dark:bg-12 text-08 dark:text-11 grid lg:grid-cols-[auto_1fr]">
			<HeaderBar />
			<FormProvider {...form}>
				<Outlet />
			</FormProvider>
		</div>
	);
}
