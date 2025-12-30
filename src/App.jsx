import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWrapper from './pages/MainWrapper';
import Error from './pages/Error';
import Invoices from './pages/Invoices';
import ViewInvoice from './pages/ViewInvoice';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainWrapper />} errorElement={<Error />}>
					<Route errorElement={<Error />}>
						<Route index={true} element={<Invoices />} />
						<Route path="/invoice/:invoiceId" element={<ViewInvoice />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
