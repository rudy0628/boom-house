import { Container, Heading, Text, Image, Box, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<Container
			maxWidth="8xl"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			pt={4}
			pb={9}
			gap={4}
		>
			<Heading textColor="gray.600" as="h1" size="xl">
				喔嗚！
			</Heading>
			<Text fontWeight="bold" fontSize="lg" color="gray.600">
				404 頁面不存在
			</Text>
			<Box
				width={{ base: '100%', sm: '70%', lg: '50%', xl: '30%' }}
				height="30%"
			>
				<Image
					width="100%"
					height="100%"
					objectFit="cover"
					src={`${window.location.origin}/404Page.jpg`}
				/>
			</Box>
			<Text fontWeight="bold" fontSize="xl" color="gray.600">
				這個頁面好像去度假了
			</Text>
			<Button
				variant="solid"
				bgColor="primary.500"
				color="white"
				as={Link}
				to="/"
				_hover={{ bgColor: 'primary.600' }}
			>
				返回首頁
			</Button>
		</Container>
	);
};

export default PageNotFound;
