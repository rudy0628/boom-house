import {
	Container,
	Box,
	Avatar,
	Text,
	Stack,
	Link,
	Grid,
} from '@chakra-ui/react';

const footerLinks = [
	{
		title: '提供項目',
		links: ['查看所有地雷屋', '新增地雷屋', '管理你的地雷屋', '地雷地圖'],
	},
	{
		title: '加入我們',
		links: ['聯絡我們', '職位', '關於我們', '新增會員'],
	},
	{
		title: '規範',
		links: ['隱私權', '免責聲明', '使用者條款'],
	},
];

const FooterLink = () => {
	return (
		<Container px={0} py={16} maxWidth="8xl">
			{/* Banner and Footer links */}
			<Box
				display="flex"
				justifyContent="space-between"
				gap={16}
				flexDirection={{ base: 'column', lg: 'row' }}
			>
				{/* Banner */}
				<Box>
					<Avatar
						size="xl"
						name="boom house logo"
						src="../../public/icon/boom_house-logos_transparent.png"
					/>
					<Text mt={4} color="gray.600" fontSize="lg">
						全台灣最大的租屋地雷經驗分享平台
					</Text>
				</Box>
				{/* Footer links */}
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
					gap={8}
				>
					{footerLinks.map((footerLink, index) => (
						<Stack
							minWidth={48}
							fontSize="lg"
							fontWeight="bold"
							color="gray.600"
							key={index}
						>
							<Text fontSize="md" color="gray.500">
								{footerLink.title}
							</Text>
							{footerLink.links.map((link, index) => (
								<Link
									_hover={{ textUnderlineOffset: 'none', color: 'gray.700' }}
									key={index}
								>
									{link}
								</Link>
							))}
						</Stack>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default FooterLink;
