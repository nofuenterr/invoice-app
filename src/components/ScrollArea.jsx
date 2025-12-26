import { ScrollArea } from 'radix-ui';

export default function ScrollAreaRoot({ children, flex, padded = false }) {
	return (
		<ScrollArea.Root className={'h-full overflow-hidden ' + flex}>
			<ScrollArea.Viewport
				className={'h-full w-full ' + (padded ? 'pr-5' : '')}
			>
				{children}
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar
				className="bg-04 hover:bg-03 flex w-2.5 touch-none p-0.5 transition-[background] duration-150 ease-out select-none"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="bg-01 relative flex-1 rounded-[10px] before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
			</ScrollArea.Scrollbar>

			<ScrollArea.Corner className="bg-04" />
		</ScrollArea.Root>
	);
}
