import { useEffect, useState } from 'react';

// react router dom
import { useParams } from 'react-router-dom';

// chakra
import { Text, Alert, AlertIcon, Box, Spinner } from '@chakra-ui/react';

// type
import { IHouse } from '../../type';

// components
import House from '../AllHousesPage/House';

const PopularHouses = () => {
	const { id } = useParams();

	// houses
	const [houses, setHouses] = useState<IHouse[]>([]);

	// favorite is change
	const [favoriteIsChange, setFavoriteIsChange] = useState(false);

	// isLoading and hasError
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchHouses = async () => {
			const housesResponse = await fetch(
				`${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/find/popular`
			);

			const housesResponseJson = await housesResponse.json();

			setHouses(housesResponseJson);
			setIsLoading(false);
		};

		fetchHouses().catch(err => {
			setError(err.message);
			setIsLoading(false);
		});
	}, [favoriteIsChange]);

	return (
		<>
			<Text fontSize="2xl" textAlign="center" fontWeight="bold">
				精選地雷
			</Text>
			{error === '' &&
				!isLoading &&
				houses.length > 0 &&
				houses
					.filter(house => house.id !== id)
					.map(house => (
						<House
							key={house.id}
							house={house}
							isMobile={true}
							setFavoriteIsChange={setFavoriteIsChange}
						/>
					))}

			{/* error */}
			{error !== '' && !isLoading && (
				<Alert status="error" rounded="md" mt={2}>
					<AlertIcon />
					{error}
				</Alert>
			)}

			{/* no popular house */}
			{error === '' && !isLoading && houses.length === 0 && (
				<Alert status="info" rounded="md" mt={2}>
					<AlertIcon />
					{error}
				</Alert>
			)}

			{/* loading spinner */}
			{isLoading && (
				<Box p={4} display="flex" justifyContent="center">
					<Spinner size="lg" color="primary.500" />
				</Box>
			)}
		</>
	);
};

export default PopularHouses;
