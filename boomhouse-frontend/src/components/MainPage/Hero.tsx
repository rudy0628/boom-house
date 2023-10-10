import {
	Box,
	Badge,
	Text,
	Heading,
	Highlight,
	Button,
	Image,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

// react icons
import { AiOutlineArrowRight } from 'react-icons/ai';

const Hero = () => {
	return (
		<Box display="flex" height={{ base: '75vh', lg: '90vh' }} minWidth="368px">
			<Box
				minWidth="50%"
				width={{ base: '100%', lg: '50%' }}
				display="flex"
				flexDirection="column"
				gap={10}
				justifyContent="center"
				alignItems="start"
			>
				{/* Badge */}
				<Badge
					bgColor="red.50"
					p={1}
					pr={3}
					rounded="full"
					display="flex"
					alignItems="center"
					gap={2}
					fontSize="md"
					cursor="pointer"
					as={Link}
					to="/houses"
				>
					<Badge
						bgColor="pink.500"
						color="white"
						px={3}
						py={1}
						rounded="full"
						fontSize="md"
					>
						最新
					</Badge>
					<Box color="pink.700" display="flex" alignItems="center" gap={2}>
						<Text>最新的地雷租屋處已上架，快來查看吧</Text>
						<AiOutlineArrowRight />
					</Box>
				</Badge>

				{/* title */}
				<Heading as="h1" size="3xl" fontWeight="semibold" lineHeight={1.25}>
					<Highlight
						query="最雷"
						styles={{
							px: '3',
							py: '1',
							mx: '1',
							rounded: 'full',
							bg: 'primary.100',
						}}
					>
						分享你最雷的租屋經驗
					</Highlight>
				</Heading>

				{/* Description */}
				<Text
					fontSize={{ base: 'xl', md: '2xl' }}
					fontWeight="medium"
					color="gray.600"
				>
					目標成為全台最大的租屋經驗透明網站，給予所有的租客更好的租屋環境，讓租屋市場更加進步
				</Text>

				{/* Button */}
				<Box
					display="flex"
					flexDirection={{ base: 'column', sm: 'row' }}
					alignItems="center"
					gap={3}
					width="100%"
				>
					<Button
						size="lg"
						bgColor="primary.500"
						_hover={{ bgColor: 'primary.600' }}
						color="white"
						width={{ base: '100%', sm: 'auto' }}
						as={Link}
						to="/houses/add"
					>
						開始分享！
					</Button>
					<Button
						size="lg"
						variant="outline"
						color="gray.600"
						_hover={{ color: 'gray.700', bgColor: 'gray.100' }}
						width={{ base: '100%', sm: 'auto' }}
						as={Link}
						to="/houses"
					>
						查看所有地雷屋
					</Button>
				</Box>

				{/* Additional text */}
				<Text
					fontWeight="bold"
					letterSpacing={0.65}
					color="gray.700"
					lineHeight={1.75}
				>
					<Highlight
						query="200,000+"
						styles={{
							px: '3',
							py: '1',
							rounded: 'full',
							bg: 'primary.100',
						}}
					>
						200,000+ 人使用過地雷屋，快來加入我們吧！
					</Highlight>
				</Text>
			</Box>

			{/* image */}
			<Box width="50%" display={{ base: 'none', lg: 'block' }}>
				<Image
					src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
					objectFit="cover"
					width="100%"
					height="100%"
					clipPath="polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)"
				/>
			</Box>
		</Box>
	);
};

export default Hero;
