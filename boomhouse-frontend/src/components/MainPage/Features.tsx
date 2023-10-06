import { Box, Heading, Text, Grid, GridItem, Icon } from '@chakra-ui/react';

import { BsFillHouseFill, BsFillPenFill, BsMap } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatPrivateLine } from 'react-icons/ri';

const featureList = [
	{
		icon: BsFillHouseFill,
		title: '20,000+ 地雷屋',
		description: '地雷屋提供超過 20,000+ 地雷屋，幫助租屋人篩選更好的房屋',
	},
	{
		icon: BsFillPenFill,
		title: '輕鬆管理你的地雷屋',
		description: '地雷屋提供給你簡單明瞭的介面，讓你可以輕鬆管理你的地雷屋',
	},
	{
		icon: AiOutlineSearch,
		title: '輕鬆查詢地雷屋',
		description: '地雷屋提供各種查詢，提供給租屋者更好的使用體驗',
	},
	{
		icon: RiChatPrivateLine,
		title: '匿名化貼文',
		description: '地雷屋提供租屋者使用匿名來發文，不用擔心惡房東的迫害',
	},
	{
		icon: BsMap,
		title: '地雷地圖',
		description:
			'地雷屋提供地雷地圖，可以讓租屋者查詢目前位置或想要租屋位置附近的地雷屋',
	},
	{
		icon: BiHelpCircle,
		title: '提供使用者幫助',
		description: '地雷屋提供幫助表單，提供使用者更好的幫助',
	},
];

const Features = () => {
	return (
		<Box minHeight="90vh" py={24}>
			<Text
				color="primary.500"
				textAlign="center"
				fontSize="xl"
				fontWeight="bold"
			>
				功能
			</Text>

			{/* Title */}
			<Heading
				size="2xl"
				as="h1"
				mt={8}
				fontWeight="extrabold"
				textAlign="center"
			>
				我們提供什麼功能？
			</Heading>

			{/* Description */}
			<Text
				fontSize="xl"
				fontWeight="medium"
				color="gray.600"
				mt={8}
				textAlign="center"
			>
				地雷屋提供超過 20,000+
				的地雷經驗分享，包括地點、租約及地雷經驗，提供給所有租屋人更好的租屋環境
			</Text>

			{/* feature items */}
			<Grid
				templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
				gap={12}
				mt={14}
			>
				{featureList.map((feature, index) => (
					<GridItem w="100%" display="flex" gap={4} key={index}>
						{/* icon */}
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							bg="primary.500"
							minWidth={12}
							height={12}
							rounded="md"
						>
							<Icon
								display="inline-block"
								flexShrink={1}
								as={feature.icon}
								color="white"
								width={6}
								height={6}
							/>
						</Box>
						{/* Description */}
						<Box>
							<Text fontSize="2xl" fontWeight="medium">
								{feature.title}
							</Text>
							<Text mt={2} fontSize="lg" color="gray.600">
								{feature.description}
							</Text>
						</Box>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default Features;
