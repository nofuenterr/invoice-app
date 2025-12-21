import { Outlet } from 'react-router-dom';

export default function MainWrapper() {
	return (
		<div>
			Main Wrapper
			<Outlet />
		</div>
	);
}
