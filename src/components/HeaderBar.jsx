import { useThemeStore } from '../stores/themeStore';
import { Switch, Avatar, Separator } from 'radix-ui';
import SunIcon from './ui/SunIcon';
import MoonIcon from './ui/MoonIcon';
import logo from '../assets/ui/logo.svg';
import avatar from '../assets/ui/image-avatar.jpg';

export default function HeaderBar() {
	const { dark, switchTheme } = useThemeStore();

	return (
		<header className="bg-13 flex h-18 items-center gap-6 md:h-20 md:gap-8 lg:h-dvh lg:w-25 lg:flex-col lg:gap-6 lg:rounded-tr-[20px] lg:rounded-br-[20px]">
			<div className="bg-01 relative mr-auto grid aspect-square size-18 place-content-center overflow-hidden rounded-tr-[20px] rounded-br-[20px] md:size-20 lg:mb-auto lg:size-25">
				<img src={logo} alt="Brand logo" className="z-10" />
				<div className="bg-02 absolute top-1/2 grid aspect-square size-full place-content-center rounded-tl-[20px] rounded-bl-[20px]"></div>
			</div>

			<Switch.Root
				onClick={switchTheme}
				className="cursor-pointer"
				aria-label={'Switch theme to ' + (dark ? 'light' : 'dark') + ' mode'}
			>
				{dark ? <SunIcon /> : <MoonIcon />}
			</Switch.Root>

			<Separator.Root
				className="bg-14 h-full w-px lg:hidden"
				decorative
				orientation="vertical"
			/>
			<Separator.Root
				className="bg-14 hidden h-px w-full lg:inline-block"
				decorative
			/>

			<Avatar.Root className="mr-6 md:mr-8 lg:mr-0 lg:mb-6">
				<Avatar.Image
					className="size-8 rounded-full lg:size-10"
					src="/src/assets/ui/image-avatar.jpg"
					alt={avatar}
				/>
				<Avatar.Fallback
					className="bg-11 text-02 flex size-full place-content-center text-base leading-none font-medium"
					delayMs={600}
				>
					IA
				</Avatar.Fallback>
			</Avatar.Root>
		</header>
	);
}
