import { useState, useEffect } from 'react';

// router
import { Link as ReactRouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// chakra
import {
	Link as ChakraLink,
	Container,
	Box,
	Button,
	Menu,
	MenuList,
	MenuItem,
	MenuButton,
	Avatar,
	Divider,
	Spinner,
	IconButton,
	Image,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerCloseButton,
	DrawerFooter,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// icons
import { BsHouse } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';

const navLinks = [
	{
		name: '所有房屋',
		to: '/houses',
	},
	{
		name: '地雷地圖',
		to: '/map',
	},
	{
		name: '隱私權',
		to: '/privacy',
	},
];

const userLinks = [
	{
		name: '我的地雷屋',
		to: '/user/houses',
		icon: <BsHouse />,
	},
];

const adminLinks = [
	{
		name: '檢舉',
		to: '/reports',
	},
];

const Navbar = () => {
	// scroll state
	const [scrolled, setScrolled] = useState(false);

	// auth state
	const [token, setToken] = useState('');
	const {
		isLoading,
		isAuthenticated,
		user,
		loginWithRedirect,
		logout,
		getAccessTokenSilently,
	} = useAuth0();

	// drawer
	const [drawerIsOpened, setDrawerIsOpened] = useState(false);
	const [isLessThanMd] = useMediaQuery('(max-width: 48em)');

	// router
	const location = useLocation();

	// scroll effect
	useEffect(() => {
		window.onscroll = function () {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
	}, []);

	// get token effect
	useEffect(() => {
		getAccessTokenSilently()
			.then(token => {
				if (token) {
					setToken(token);
				}
			})
			.catch(() => {});
	}, []);

	return (
		<Box
			position="sticky"
			top="0"
			zIndex="docked"
			background="white"
			boxShadow={scrolled ? 'md' : 'none'}
			transition="box-shadow 0.2s,background 0.2s"
		>
			<Container
				display="flex"
				px={{ base: 4, md: 8 }}
				py={2}
				maxWidth="8xl"
				justifyContent="space-between"
				alignItems="center"
			>
				{/* Desktop */}
				<Box display="flex" gap={8} alignItems="center">
					{/* Home */}
					<ChakraLink as={ReactRouterLink} to="/">
						<Image
							src={`${window.location.origin}/icon/boom_house-logos_transparent.png`}
							alt="boom house"
							boxSize="80px"
						/>
					</ChakraLink>
					{/* nav links */}
					{navLinks.map((link, index) => (
						<ChakraLink
							as={ReactRouterLink}
							to={link.to}
							fontWeight="bold"
							fontSize="lg"
							letterSpacing={0.75}
							color="gray.600"
							_hover={{ textUnderlineOffset: false, color: 'gray.700' }}
							key={index}
							display={{ base: 'none', md: 'block' }}
						>
							{link.name}
						</ChakraLink>
					))}
					{/* admin nav links */}
					{user?.email === 'admin@boomhouse.com' &&
						adminLinks.map((link, index) => (
							<ChakraLink
								as={ReactRouterLink}
								to={link.to}
								fontWeight="bold"
								fontSize="lg"
								letterSpacing={0.75}
								color="gray.600"
								_hover={{ textUnderlineOffset: false, color: 'gray.700' }}
								key={index}
								display={{ base: 'none', md: 'block' }}
							>
								{link.name}
							</ChakraLink>
						))}
				</Box>
				{/* Sign in button */}
				{!isLoading ? (
					<Box display={{ base: 'none', md: 'block' }}>
						{token !== '' && isAuthenticated ? (
							<Menu>
								<MenuButton
									as={Avatar}
									aria-label="Options"
									src={user?.picture}
									variant="outline"
									_hover={{ cursor: 'pointer' }}
									size="md"
								/>
								<MenuList>
									{userLinks.map((link, index) => (
										<MenuItem
											key={index}
											icon={link.icon}
											as={ReactRouterLink}
											to={link.to}
										>
											{link.name}
										</MenuItem>
									))}
									<Divider />
									<MenuItem icon={<FiLogOut />} onClick={() => logout()}>
										登出
									</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<Button
								colorScheme="teal"
								variant="outline"
								ml="auto"
								size="lg"
								color="primary.500"
								_hover={{ bgColor: 'primary.100' }}
								onClick={() => loginWithRedirect()}
							>
								登入
							</Button>
						)}
					</Box>
				) : (
					<Spinner
						size="md"
						color="primary.500"
						display={{ base: 'none', md: 'block' }}
					/>
				)}

				{/* mobile */}

				{/* mobile navbar tab button */}
				<Box display={{ base: 'block', md: 'none' }}>
					<IconButton
						variant="outline"
						color="primary.500"
						borderColor="primary.500"
						_hover={{ bgColor: 'primary.100' }}
						aria-label="Menu button"
						fontSize="20"
						icon={<RxHamburgerMenu />}
						size="lg"
						onClick={() => setDrawerIsOpened(true)}
					/>
				</Box>

				{/* mobile nav drawer */}
				<Drawer
					placement="left"
					onClose={() => setDrawerIsOpened(false)}
					isOpen={drawerIsOpened && isLessThanMd}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader justifyContent="center">
							<Avatar
								src={`${window.location.origin}/icon/boom_house-logos_transparent.png`}
								size="xl"
							/>
						</DrawerHeader>
						<DrawerBody display="flex" flexDirection="column" gap={2}>
							{/* nav links */}
							{navLinks.map((link, index) => (
								<Button
									key={index}
									as={ReactRouterLink}
									to={link.to}
									color="primary.500"
									bgColor={
										link.to === location.pathname ? 'primary.100' : 'none'
									}
									_hover={{ bgColor: 'primary.100' }}
									variant="ghost"
									width="100%"
									display="flex"
									justifyContent="start"
									alignItems="center"
									letterSpacing={0.75}
									fontSize="lg"
									onClick={() => setDrawerIsOpened(false)}
								>
									{link.name}
								</Button>
							))}
							<Divider />
							{/* user links */}
							{userLinks.map((link, index) => (
								<Button
									key={index}
									as={ReactRouterLink}
									to={link.to}
									color="primary.500"
									bgColor={
										link.to === location.pathname ? 'primary.100' : 'none'
									}
									_hover={{ bgColor: 'primary.100' }}
									variant="ghost"
									width="100%"
									display="flex"
									justifyContent="start"
									alignItems="center"
									letterSpacing={0.75}
									fontSize="lg"
									onClick={() => setDrawerIsOpened(false)}
								>
									{link.name}
								</Button>
							))}
						</DrawerBody>
						{/* username email and avatar */}
						<DrawerFooter
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							{token !== '' && isAuthenticated ? (
								<Box display="flex" alignItems="center" gap={3} mr={2}>
									<Avatar src={user?.picture} size="md" />
									<Box>
										<Text
											fontSize="sm"
											fontWeight="medium"
											letterSpacing={0.75}
										>
											{user?.nickname}
										</Text>
										<Text fontSize="sm" fontWeight="medium" color="gray.600">
											{user?.email}
										</Text>
									</Box>
									<IconButton
										variant="ghost"
										color="primary.500"
										_hover={{ bgColor: 'primary.100' }}
										aria-label="Logout"
										icon={<FiLogOut />}
										onClick={() => logout()}
									/>
								</Box>
							) : (
								<Button
									variant="outline"
									width="100%"
									borderColor="primary.500"
									color="primary.500"
									_hover={{ bgColor: 'primary.100' }}
									onClick={() => loginWithRedirect()}
								>
									登入
								</Button>
							)}
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Container>
		</Box>
	);
};

export default Navbar;
