import { Link as ReactRouterLink } from 'react-router-dom';

import {
	Container,
	Box,
	Text,
	Link,
	Divider,
} from '@chakra-ui/react';

import { BsGithub, BsTwitter, BsDiscord } from 'react-icons/bs';

const socialLinks = [
	{
		to: '/',
		icon: <BsGithub />,
	},
	{
		to: '/',
		icon: <BsTwitter />,
	},
	{
		to: '/',
		icon: <BsDiscord />,
	},
];

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<Container px={{ base: 4, md: 8 }} pb={8} maxWidth="8xl">
			<Divider mb={8} />

			{/* Footer all rights reserved and social links */}
			<Box
				display="flex"
				flexDirection={{ base: 'column-reverse', md: 'row' }}
				justifyContent="space-between"
				gap={4}
			>
				<Text color="gray.600">&copy; {year} 地雷屋版權所有</Text>
				<Box display="flex" gap={4}>
					{socialLinks.map((link, index) => (
						<Link
							key={index}
							to={link.to}
							aria-label="github"
							as={ReactRouterLink}
							w="auto"
							h="auto"
							bg="none"
							fontSize="3xl"
							color="gray.500"
							_hover={{
								bg: 'none',
								color: 'gray.700',
							}}
						>
							{link.icon}
						</Link>
					))}
				</Box>
			</Box>
		</Container>
	);
};

export default Footer;
