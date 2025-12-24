import { useThemeStore } from '../stores/themeStore';
import { Switch, Avatar } from 'radix-ui';
import SunIcon from './ui/SunIcon';
import MoonIcon from './ui/MoonIcon';

export default function HeaderBar() {
	const { dark, switchTheme } = useThemeStore();

	return (
		<header>
			<div>
				<img src="/src/assets/ui/logo.svg" alt="Brand logo" />
			</div>

			<Switch.Root
				onClick={switchTheme}
				className="cursor-pointer"
				aria-label={'Switch theme to ' + (dark ? 'light' : 'dark') + ' mode'}
			>
				{dark ? <SunIcon /> : <MoonIcon />}
			</Switch.Root>

			<Avatar.Root className="AvatarRoot">
				<Avatar.Image
					src="/src/assets/ui/image-avatar.jpg"
					alt="Image avatar"
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
