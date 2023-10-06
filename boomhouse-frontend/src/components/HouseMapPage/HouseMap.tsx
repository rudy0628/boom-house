import { useCallback, useState } from 'react';

// google map
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

// chakra
import { Box, Spinner } from '@chakra-ui/react';

interface IHouseMap {
	geocodings: {
		id: string;
		latAndLng: {
			lat: number;
			lng: number;
		};
	}[];
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentHouseId: React.Dispatch<React.SetStateAction<string>>;
}

const HouseMap = ({
	geocodings,
	setModalIsOpen,
	setCurrentHouseId,
}: IHouseMap) => {
	const [latAndLng, setLatAndLng] = useState({
		lat: 0,
		lng: 0,
	});

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
		language: 'zh-TW',
	});

	const onLoad = useCallback(async function callback(map: any) {
		navigator.geolocation.getCurrentPosition(position => {
			setLatAndLng({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
		map.setZoom(15);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{
				width: '100%',
				height: '100%',
			}}
			center={latAndLng}
			zoom={10}
			onLoad={onLoad}
		>
			{geocodings.map(geocoding => (
				<MarkerF
					position={geocoding.latAndLng}
					icon={{
						url: '../../public/icon/house-pin-icon.png',
						scaledSize: new window.google.maps.Size(50, 50),
					}}
					onClick={() => {
						setCurrentHouseId(geocoding.id);
						setModalIsOpen(true);
					}}
					key={geocoding.id}
				/>
			))}
		</GoogleMap>
	) : (
		<Box width="100%" height={50} py={4} display="flex" justifyContent="center">
			<Spinner color="primary.500" />
		</Box>
	);
};

export default HouseMap;
