import { useState, useEffect } from 'react';

// chakra
import {
	Container,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Spinner,
	Box,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';

// component
import HouseMap from '../components/HouseMapPage/HouseMap';
import House from '../components/AllHousesPage/House';

// type
import { IHouse } from '../type';

const HouseMapPage = () => {
	// house modal
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [currentHouseId, setCurrentHouseId] = useState('');
	const [currentHouse, setCurrentHouse] = useState<IHouse>();
	const [favoriteIsChange, setFavoriteIsChange] = useState(false);

	// house geocoding
	const [geocodings, setGeocodings] = useState<
		{
			id: string;
			latAndLng: {
				lat: number;
				lng: number;
			};
		}[]
	>([]);

	// marker is loading and error
	const [markerError, setMarkerError] = useState('');

	// house is loading and error
	const [houseIsLoading, setHouseIsLoading] = useState(true);
	const [houseError, setHouseError] = useState('');

	// get all houses address
	useEffect(() => {
		const fetchHousesAddress = async () => {
			// fetch all houses address and houseId
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/address`;

			const response = await fetch(url);

			const responseJson = await response.json();

			const geocodings = [];
			for (const houseAddress of responseJson) {
				// fetch lat and lng using geocoding
				const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
					houseAddress.address
				}&key=${import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}`;

				const geocodingResponse = await fetch(url);

				const geocodingResponseJson = await geocodingResponse.json();

				const geocoding = {
					id: houseAddress.houseId,
					latAndLng: {
						lat: geocodingResponseJson.results[0].geometry.location.lat,
						lng: geocodingResponseJson.results[0].geometry.location.lng,
					},
				};

				geocodings.push(geocoding);
			}

			setGeocodings(geocodings);
		};

		fetchHousesAddress().catch(() => {
			setMarkerError('喔！地圖好像出了一些問題，請重新整理頁面再試一次！');
		});
	}, []);

	// fetch house
	useEffect(() => {
		const fetchHouse = async () => {
			const url = `${
				import.meta.env.VITE_API_URL_DOMAIN
			}/api/houses/${currentHouseId}`;

			const response = await fetch(url);

			const responseJson = await response.json();

			const house: any = {};
			for (const [key, value] of Object.entries(responseJson)) {
				if (key !== '_links') {
					house[key] = value;
				}
			}

			setHouseIsLoading(false);
			setCurrentHouse(house);
		};

		if (currentHouseId !== '') {
			fetchHouse().catch(() => {
				setHouseIsLoading(false);
				setHouseError(
					'喔！這個地雷屋好像出了一些問題，請重新整理頁面再試一次！'
				);
			});
		}
	}, [currentHouseId, favoriteIsChange]);

	return (
		<>
			<Container maxWidth="100vw" height="100vh" pb={8}>
				{/* map */}
				{markerError === '' && (
					<HouseMap
						geocodings={geocodings}
						setModalIsOpen={setModalIsOpen}
						setCurrentHouseId={setCurrentHouseId}
					/>
				)}

				{/* error alert */}
				{markerError !== '' && (
					<Alert status="error" my={4} rounded="md">
						<AlertIcon />
						{markerError}
					</Alert>
				)}
			</Container>
			{/* house open modal */}
			<Modal
				isOpen={modalIsOpen}
				onClose={() => {
					setModalIsOpen(false);
					setCurrentHouseId('');
				}}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody py={8}>
						{currentHouse && !houseIsLoading && houseError === '' && (
							<House
								house={currentHouse!}
								isMobile={true}
								setFavoriteIsChange={setFavoriteIsChange}
							/>
						)}
						{houseIsLoading && (
							<Box width="100%" display="flex" justifyContent="center" py={4}>
								<Spinner color="primary.500" />
							</Box>
						)}
						{!houseIsLoading && houseError !== '' && (
							<Alert status="error" my={4} rounded="md">
								<AlertIcon />
								{houseError}
							</Alert>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default HouseMapPage;
