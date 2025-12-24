import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
	dark: boolean;
	switchTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			dark: false,
			switchTheme: () =>
				set(() => ({
					dark: !get().dark,
				})),
		}),
		{
			name: 'theme-storage',
		}
	)
);
