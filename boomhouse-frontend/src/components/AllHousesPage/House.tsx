import React, { useState, useEffect } from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';

import {
	Card,
	Image,
	Stack,
	CardBody,
	Heading,
	Text,
	Badge,
	Box,
	IconButton,
	useToast,
} from '@chakra-ui/react';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// icon
import { MdOutlineDescription, MdOutlineLocationOn } from 'react-icons/md';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// type
import { IHouse } from '../../type';

const House = ({
	house,
	isMobile,
	setFavoriteIsChange,
}: {
	house: IHouse;
	isMobile?: boolean;
	setFavoriteIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// auth0
	const { getAccessTokenSilently, user } = useAuth0();

	// toast
	const toast = useToast();

	// favorite
	const [isFavorite, setIsFavorite] = useState(false);

	// token
	const [token, setToken] = useState('');

	const formateTime = new Intl.DateTimeFormat('zh-TW').format(
		new Date(house.updateTime)
	);

	const handleFavorite = async (e: any) => {
		e.preventDefault();

		if (token) {
			// add or remove favorite to database
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/favorites/secure`;

			const options = {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					houseId: house.id,
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

				setFavoriteIsChange(prevState => !prevState);
				setIsFavorite(prevState => !prevState);
			} catch (e) {
				toast({
					title: '操作過於頻繁，請再試一次！',
					status: 'error',
					isClosable: true,
				});
			}
		}
	};

	// fetch user is favorite or not
	useEffect(() => {
		const fetchFavorite = async () => {
			if (user) {
				const url = `${
					import.meta.env.VITE_API_URL_DOMAIN
				}/api/favorites/find?houseId=${house.id}&userEmail=${user.email}`;

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
	}, [house, user]);

	// set token
	useEffect(() => {
		getAccessTokenSilently().then(token => {
			setToken(token);
		});
	}, []);

	return (
		<Card
			direction={{ base: 'column', sm: isMobile ? 'column' : 'row' }}
			as={ReactRouterLink}
			overflow="hidden"
			variant="outline"
			mt={4}
			_hover={{ bgColor: 'gray.50', cursor: 'pointer' }}
			to={`/houses/${house.id}`}
		>
			<Box
				maxW={{ base: '100%', sm: isMobile ? '100%' : '200px' }}
				maxH={{ base: '250px', sm: isMobile ? '250px' : '100%' }}
				overflow="hidden"
			>
				<Image
					objectFit="cover"
					width="100%"
					height="100%"
					src={house.images[0]}
					alt={house.title}
				/>
			</Box>

			<Stack width="100%">
				<CardBody display="flex" flexDirection="column" gap={3}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Heading size="md">{house.title}</Heading>
						{token && (
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
					</Box>
					<Stack direction="row" wrap="wrap">
						{house.tags.map((tag, index) => (
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
					<Box
						display="flex"
						gap={2}
						fontSize="sm"
						alignItems="center"
						flexWrap="wrap"
					>
						<Text>{house.houseType}</Text>
						<Text color="gray.100">|</Text>
						<Text>
							最後更新日期：
							{formateTime}
						</Text>
						<Text color="gray.100">|</Text>
						<Text>{house.favoriteCount} 人已收藏</Text>
					</Box>

					<Box display="flex" alignItems="center" gap={1} color="gray.400">
						<MdOutlineDescription />
						<Text color="gray.800">
							內容：{house.description.slice(0, 100)}
						</Text>
					</Box>
					<Box display="flex" alignItems="center" gap={1} color="gray.400">
						<MdOutlineLocationOn />
						<Text color="gray.800">地點：{house.address}</Text>
					</Box>
					<Box display="flex" alignItems="center" gap={1} color="gray.400">
						<AiFillStar />
						<Text color="gray.800">
							地雷指數：{house.rating.toString()} / 5.0
						</Text>
					</Box>
				</CardBody>
			</Stack>
		</Card>
	);
};

export default House;
