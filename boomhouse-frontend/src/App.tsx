import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';

import { useAuth0 } from '@auth0/auth0-react';

import { Box } from '@chakra-ui/react';

import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';

import MainPage from './page/MainPage';
import AllHousesPage from './page/AllHousesPage';
import HousePage from './page/HousePage';
import AddOrUpdateHousePage from './page/AddOrUpdateHousePage';
import HouseMapPage from './page/HouseMapPage';
import ReportsPage from './page/admin/ReportsPage';
import UserHousesPage from './page/UserHousesPage';
import PrivacyPage from './page/PrivacyPage';

function App() {
	const { isAuthenticated } = useAuth0();

	return (
		<Box w="100%" minH="100vh" display="flex" flexDirection="column">
			{/* Navbar */}
			<Navbar />

			{/* Content */}
			<Box flexGrow={1}>
				<Routes>
					{/* house */}
					<Route path="/" element={<MainPage />} />
					<Route path="/houses" element={<AllHousesPage />} />
					<Route path="/houses/:id" element={<HousePage />} />
					<Route
						path="/houses/add"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<AddOrUpdateHousePage formType="add" />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/houses/update/:id"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<AddOrUpdateHousePage formType="update" />
							</ProtectedRoute>
						}
					/>

					{/* privacy */}
					<Route path="/privacy" element={<PrivacyPage />} />

					{/* map */}
					<Route path="/map" element={<HouseMapPage />} />

					{/* Reports */}
					<Route
						path="/reports"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<ReportsPage />
							</ProtectedRoute>
						}
					/>

					{/* My houses */}
					<Route
						path="/user/houses"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<UserHousesPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Box>

			{/* Footer */}
			<Footer />
		</Box>
	);
}

export default App;
