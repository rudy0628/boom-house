import { useState, useEffect } from 'react';

// react router dom
import { Link as ReactRouterLink } from 'react-router-dom';

import {
	Container,
	Box,
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	Spinner,
	Alert,
	AlertIcon,
	Link,
	Button,
	useMediaQuery,
} from '@chakra-ui/react';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// icon
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { BsFilterRight } from 'react-icons/bs';

// components
import House from '../components/AllHousesPage/House';
import HouseFilterList from '../components/AllHousesPage/HouseFilterList';

// type
import { IHouse } from '../type';
import Pagination from '../components/utils/Pagination';

const AllHousesPage = () => {
	// auth0
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	// filter tab
	const [isFilterTabOpened, setIsFilterTabOpen] = useState(false);
	const [isLessThanMd] = useMediaQuery('(max-width: 48em)');

	// content search
	const [content, setContent] = useState('');

	// houses
	const [houses, setHouses] = useState<IHouse[]>([]);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(10);

	// houses api url and favorite is change
	const [housesApiUrl, setHousesApiUrl] = useState('');
	const [favoriteIsChange, setFavoriteIsChange] = useState(false);

	// error and isLoading
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const fetchHouses = async () => {
		if (housesApiUrl !== '') {
			const housesResponse = await fetch(
				housesApiUrl +
					`&content=${content}` +
					`&page=${currentPage - 1}&size=10`
			);

			const housesResponseJson = await housesResponse.json();

			const houses = [];

			if (housesResponseJson.content.length !== 0) {
				for (let house of housesResponseJson.content) {
					houses.push(house);
				}
			}

			setHouses(houses);
			setTotalPages(housesResponseJson.totalPages);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchHouses().catch(() => {
			setError('喔嗚！網頁好像出現了一些狀況😥，請重新整理試看看！');
			setIsLoading(false);
		});
	}, [housesApiUrl, currentPage, favoriteIsChange]);

	return (
		<Container
			maxWidth="8xl"
			px={{ base: 4, md: 8 }}
			pt={4}
			pb={8}
			display="flex"
			justifyContent="space-between"
			position="relative"
			gap={4}
		>
			{/* filter list */}
			<HouseFilterList
				isFilterTabOpened={isFilterTabOpened}
				setIsFilterTabOpened={setIsFilterTabOpen}
				isLessThanMd={isLessThanMd}
				setHousesApiUrl={setHousesApiUrl}
			/>
			{/* search bar and all houses */}
			<Box flex={1}>
				{/* Search bar */}
				<Box display="flex" gap={2}>
					<InputGroup size="md" width="100%">
						<Input
							pr="4.5rem"
							type="text"
							placeholder="輸入內容或標題"
							_focus={{ borderColor: 'primary.500' }}
							onChange={e => setContent(e.target.value)}
							value={content}
						/>
						<InputRightElement width="3rem">
							<IconButton
								aria-label="search"
								icon={<AiOutlineSearch />}
								h="1.75rem"
								size="sm"
								onClick={fetchHouses}
							/>
						</InputRightElement>
					</InputGroup>
					{/* Open filter tab button (mobile) */}
					<IconButton
						aria-label="search"
						icon={<BsFilterRight />}
						variant="outline"
						color="primary.500"
						borderColor="primary.500"
						_hover={{ bgColor: 'primary.100' }}
						fontSize="2xl"
						display={{ base: 'inline-flex', md: 'none' }}
						onClick={() => setIsFilterTabOpen(true)}
					/>
				</Box>
				{!isLoading && error === '' && houses.length !== 0 && (
					<Box>
						{/* All houses */}
						{houses.map((house, index) => (
							<House
								key={index}
								house={house}
								setFavoriteIsChange={setFavoriteIsChange}
							/>
						))}
						{/* Paginate */}
						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={totalPages}
						/>
					</Box>
				)}

				{/* isLoading */}
				{isLoading && (
					<Box p={4} display="flex" justifyContent="center">
						<Spinner size="lg" color="primary.500" />
					</Box>
				)}

				{/* has error */}
				{!isLoading && error !== '' && (
					<Box p={4}>
						<Alert status="error" rounded="md">
							<AlertIcon />
							{error}
						</Alert>
					</Box>
				)}

				{/* no houses */}
				{!isLoading && error === '' && houses.length === 0 && (
					<Box p={4}>
						<Alert status="info" rounded="md">
							<AlertIcon />
							目前沒有任何地雷屋，快來新增吧！
							<Link
								as={ReactRouterLink}
								color="primary.500"
								to={isAuthenticated ? '/houses/add' : ''}
								onClick={isAuthenticated ? () => {} : () => loginWithRedirect()}
							>
								新增地雷屋
							</Link>
						</Alert>
					</Box>
				)}
			</Box>
			<Button
				leftIcon={<AiOutlinePlus />}
				as={ReactRouterLink}
				to="/houses/add"
				position="fixed"
				right={8}
				bottom={8}
				variant="solid"
				bgColor="primary.500"
				color="white"
				_hover={{ bgColor: 'primary.600' }}
				zIndex={100}
			>
				新增地雷屋
			</Button>
		</Container>
	);
};

export default AllHousesPage;
