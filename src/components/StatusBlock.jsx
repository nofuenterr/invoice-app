export default function StatusBlock({ status }) {
	const statusBackground =
		status === 'paid'
			? 'bg-paid-light'
			: status === 'pending'
				? 'bg-pending-light'
				: 'bg-draft-light dark:bg-05-light';
	const statusIndicator =
		status === 'paid'
			? 'bg-paid'
			: status === 'pending'
				? 'bg-pending'
				: 'bg-draft dark:bg-05';
	const statusTextColor =
		status === 'paid'
			? 'text-paid'
			: status === 'pending'
				? 'text-pending'
				: 'text-draft dark:text-05';
	const statusText =
		status === 'paid' ? 'Paid' : status === 'pending' ? 'Pending' : 'Draft';

	return (
		<div
			className={
				'flex w-[104px] items-center justify-center gap-2 justify-self-end rounded-md py-3.5 text-[15px] font-bold md:ml-5 ' +
				statusBackground
			}
		>
			<div className={'size-2 rounded-full ' + statusIndicator}></div>
			<span className={statusTextColor}>{statusText}</span>
		</div>
	);
}
