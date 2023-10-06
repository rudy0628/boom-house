import {
	Text,
	Box,
	Heading,
	Grid,
	GridItem,
	Card,
	CardBody,
	Icon,
} from '@chakra-ui/react';

import { BsFillPenFill, BsMap } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiChatPrivateLine } from 'react-icons/ri';

const featureList = [
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
];

const WhyUs = () => {
	return (
		<Box minHeight="90vh" py={24}>
			<Text
				color="primary.500"
				textAlign="center"
				fontSize="xl"
				fontWeight="bold"
			>
				精選
			</Text>

			{/* Title */}
			<Heading
				size="2xl"
				as="h1"
				mt={8}
				fontWeight="extrabold"
				textAlign="center"
			>
				為什麼選擇地雷屋？
			</Heading>

			{/* Description */}
			<Text
				fontSize="xl"
				fontWeight="medium"
				color="gray.600"
				mt={8}
				textAlign="center"
			>
				因為我們提供超過 20,000+ 的匿名地雷經驗分享，並提供簡單整潔的 UI
				介面以及涵蓋所有地雷屋的地雷地圖
			</Text>

			{/* features */}
			<Grid
				templateColumns={{
					base: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					lg: 'repeat(4, 1fr)',
				}}
				gap={6}
				mt={14}
			>
				{featureList.map((feature, index) => (
					<GridItem w="100%" key={index}>
						<Card height="100%">
							<CardBody display="flex" flexDirection="column" gap={16}>
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									bg="primary.500"
									width={12}
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
								<Box>
									{/* Title */}
									<Text fontSize="2xl" fontWeight="medium">
										{feature.title}
									</Text>
									{/* Description */}
									<Text mt={2} fontSize="lg" color="gray.600">
										{feature.description}
									</Text>
								</Box>
							</CardBody>
						</Card>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default WhyUs;
