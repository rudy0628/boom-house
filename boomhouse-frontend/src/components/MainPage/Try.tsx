import { Link as ReactRouterLink } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { Box, Text, Button } from '@chakra-ui/react';

const Try = () => {
	// auth state
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	return (
		<Box
			px={{ base: 6, md: 16 }}
			py={16}
			bgColor="gray.50"
			display="flex"
			flexDirection={{ base: 'column', lg: 'row' }}
			justifyContent="space-between"
			rounded="lg"
		>
			{/* Text */}
			<Box>
				<Text fontSize="3xl" fontWeight="extrabold">
					快來分享的你地雷經驗
				</Text>
				<Text
					fontSize="xl"
					fontWeight="medium"
					mt={3}
					mb={{ base: 6, lg: 0 }}
					color="gray.600"
				>
					新增會員加入我們，一起來分享你的地雷經驗
				</Text>
			</Box>
			{/* Button */}
			{isAuthenticated ? (
				<Button
					color="white"
					bgColor="primary.500"
					as={ReactRouterLink}
					_hover={{ bgColor: 'primary.600' }}
					size="lg"
					to="/houses/add"
				>
					立即新增你的地雷屋
				</Button>
			) : (
				<Button
					color="white"
					bgColor="primary.500"
					_hover={{ bgColor: 'primary.600' }}
					size="lg"
					onClick={() => loginWithRedirect()}
				>
					新增會員加入我們
				</Button>
			)}
		</Box>
	);
};

export default Try;
