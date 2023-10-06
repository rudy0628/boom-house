import { useEffect, useState } from 'react';

import {
	Container,
	Box,
	Image,
	Heading,
	IconButton,
	Text,
	Card,
	CardBody,
	Stack,
	Badge,
	Divider,
	Spinner,
	Alert,
	AlertIcon,
	Link,
	useToast,
	Button,
} from '@chakra-ui/react';

// react router dom
import {
	useParams,
	useNavigate,
	Link as ReactRouterLink,
} from 'react-router-dom';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// react icons
import { AiOutlineHeart, AiFillHeart, AiFillStar } from 'react-icons/ai';
import { MdOutlineDescription, MdOutlineLocationOn } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../style/house.css';

// type
import { IHouse } from '../type';

// components
import Reviews from '../components/HousePage/Reviews';
import PopularHouses from '../components/HousePage/PopularHouses';
import ReportModal from '../components/utils/ReportModal';

const HousePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// house
	const [house, setHouse] = useState<IHouse>();

	// toast
	const toast = useToast();

	// auth0
	const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

	// favorites
	const [isFavorite, setIsFavorite] = useState(false);

	// lat and lng
	const [latAndLng, setLatAndLng] = useState({ lat: 0.0, lng: 0.0 });

	// isLoading and hasError
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	// delete house is loading
	const [deleteIsLoading, setDeleteIsLoading] = useState(false);

	// report modal is open
	const [reportModalIsOpen, setReportModalIsOpen] = useState(false);

	// format
	let formateTime = '';
	if (house?.updateTime) {
		formateTime = new Intl.DateTimeFormat('zh-TW').format(
			new Date(house!.updateTime || '')
		);
	}

	// delete house
	const deleteHouse = async (e: any) => {
		e.preventDefault();

		setDeleteIsLoading(true);

		const url = `${
			import.meta.env.VITE_API_URL_DOMAIN
		}/api/houses/secure/${id}`;

		const token = await getAccessTokenSilently();

		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			setDeleteIsLoading(false);
			toast({
				title: '刪除地雷屋成功',
				status: 'success',
				isClosable: true,
			});
			navigate('/houses');
		} catch (e: any) {
			setDeleteIsLoading(false);
			toast({
				title: '刪除地雷屋失敗，請再試一次',
				status: 'error',
				isClosable: true,
			});
		}
	};

	// add or remove favorite
	const handleFavorite = async (e: any) => {
		e.preventDefault();

		// add or remove favorite to database
		const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/favorites/secure`;

		const token = await getAccessTokenSilently();

		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				houseId: id,
				userEmail: user?.email,
			}),
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			toast({
				title: isFavorite ? '移除收藏成功' : '加入收藏成功',
				status: 'success',
				isClosable: true,
			});

			setIsFavorite(prevState => !prevState);
		} catch (e) {
			toast({
				title: '操作過於頻繁，請再試一次！',
				status: 'error',
				isClosable: true,
			});
		}
	};

	// fetch house
	useEffect(() => {
		const fetchHouse = async () => {
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/${id}`;

			const houseResponse = await fetch(url);

			if (!houseResponse.ok) {
				navigate('/404');
			}

			const houseResponseJson = await houseResponse.json();

			const fetchHouse: any = {};

			for (const [key, value] of Object.entries(houseResponseJson)) {
				if (key !== '_links') {
					fetchHouse[key] = value;
				}
			}

			setHouse(fetchHouse);
			setIsLoading(false);
		};

		fetchHouse().catch((err: any) => {
			setError(err.message);
			setIsLoading(false);
		});
	}, [id, isFavorite]);

	// fetch user is favorite or not
	useEffect(() => {
		const fetchFavorite = async () => {
			if (user) {
				const url = `${
					import.meta.env.VITE_API_URL_DOMAIN
				}/api/favorites/find?houseId=${id}&userEmail=${user.email}`;

				const response = await fetch(url);

				const responseJson = await response.json();

				setIsFavorite(responseJson);
			}
		};
		fetchFavorite().catch(() => {
			toast({
				title: '獲取失敗，請重新整理頁面！',
				status: 'error',
				isClosable: true,
			});
		});
	}, [id, user]);

	// geocoding
	useEffect(() => {
		const getLatAndLng = async () => {
			if (house) {
				const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
					house.address
				}&key=${import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}`;

				const geocodingResponse = await fetch(url);

				const geocodingResponseJson = await geocodingResponse.json();

				setLatAndLng({
					lat: geocodingResponseJson.results[0].geometry.location.lat,
					lng: geocodingResponseJson.results[0].geometry.location.lng,
				});
			}
		};

		getLatAndLng().catch((err: any) => {
			console.log(err);
		});
	}, [house]);

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
			{/* house detail and leave message */}
			<Box flex={2} width={{ base: '85vw', lg: 'xl' }}>
				{/* house detail */}
				{error === '' && !isLoading && (
					<Card overflow="hidden">
						{/* image */}
						<Swiper
							spaceBetween={30}
							pagination={{
								clickable: true,
							}}
							modules={[Pagination]}
						>
							{house?.images.map((image, index) => (
								<SwiperSlide key={index}>
									<Image src={image} alt={`house image ${index}`} />
								</SwiperSlide>
							))}
						</Swiper>
						<CardBody display="flex" flexDirection="column" gap={4}>
							{/* title and favorites */}
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Heading as="h1" size="xl">
									{house?.title}
								</Heading>
								<Box display="flex" gap={1} alignItems="center">
									{isAuthenticated && (
										<IconButton
											color={isFavorite ? 'primary.500' : 'gray.800'}
											icon={isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
											aria-label="like"
											onClick={handleFavorite}
											bgColor="transparent"
											fontSize="xl"
											rounded="full"
											_hover={{ bgColor: 'gray.100' }}
										/>
									)}
									<Text>收藏：{house?.favoriteCount}</Text>
								</Box>
							</Box>
							{/* tags */}
							<Stack direction="row" wrap="wrap">
								{house?.tags.map((tag, index) => (
									<Badge
										px={2}
										py={1}
										bgColor="primary.100"
										color="primary.500"
										fontSize="sm"
										rounded="md"
										key={index}
									>
										{tag}
									</Badge>
								))}
							</Stack>
							{/* update time and house type */}
							<Box
								display="flex"
								gap={2}
								fontSize="sm"
								alignItems="center"
								flexWrap="wrap"
							>
								<Text>{house?.houseType}</Text>
								<Text color="gray.100">|</Text>
								<Text>
									最後更新日期：
									{formateTime}
								</Text>
							</Box>
							{/* content */}
							<Box display="flex" alignItems="center" gap={1} color="gray.400">
								<MdOutlineDescription />
								<Text color="gray.800">
									內容：{house?.description.slice(0, 100)}
								</Text>
							</Box>
							<Box display="flex" alignItems="center" gap={1} color="gray.400">
								<MdOutlineLocationOn />
								<Text color="gray.800">地點：</Text>
								<Link
									color="primary.500"
									href={`https://maps.google.com.tw/?q=${house?.address}@${latAndLng.lat},${latAndLng.lng}&z=17`}
									target="_blank"
								>
									{house?.address}
								</Link>
							</Box>
							<Box display="flex" alignItems="center" gap={1} color="gray.400">
								<AiFillStar />
								<Text color="gray.800">
									地雷指數：{house?.rating.toString()} / 5.0
								</Text>
							</Box>
							<Box display="flex" alignItems="center" gap={1} color="gray.400">
								<BiUser />
								<Text color="gray.800">
									發文者：
									{house?.anonymousPosted
										? '匿名'
										: house?.userEmail.split('@')[0]}
								</Text>
							</Box>
							{/* delete and update button or report button */}
							{house?.userEmail === user?.email ? (
								<Box display="flex" gap={3} alignItems="center">
									<Button
										isLoading={deleteIsLoading}
										leftIcon={<BsFillTrash3Fill />}
										colorScheme="red"
										size="sm"
										onClick={deleteHouse}
									>
										刪除
									</Button>
									<Button
										isLoading={deleteIsLoading}
										leftIcon={<BsFillPencilFill />}
										colorScheme="orange"
										size="sm"
										as={ReactRouterLink}
										to={`/houses/update/${id}`}
									>
										更新
									</Button>
								</Box>
							) : (
								<Box>
									<Button size="md" onClick={() => setReportModalIsOpen(true)}>
										檢舉
									</Button>
									<ReportModal
										setReportModalIsOpen={setReportModalIsOpen}
										reportModalIsOpen={reportModalIsOpen}
										reportId={id!}
										type="地雷屋"
										beReportedEmail={house?.userEmail!}
									/>
								</Box>
							)}
						</CardBody>
					</Card>
				)}

				{/* Loading spinner */}
				{isLoading && (
					<Box p={4} display="flex" justifyContent="center">
						<Spinner size="lg" color="primary.500" />
					</Box>
				)}

				{/* error */}
				{!isLoading && error !== '' && (
					<Box p={4}>
						<Alert status="error" rounded="md">
							<AlertIcon />
							{error}
						</Alert>
					</Box>
				)}

				<Divider my={8} />

				{/* reviews */}
				<Reviews houseId={house?.id} />
			</Box>

			{/* recommend house */}
			<Box flex={1} display={{ base: 'none', lg: 'block' }}>
				<PopularHouses />
			</Box>
		</Container>
	);
};

export default HousePage;
