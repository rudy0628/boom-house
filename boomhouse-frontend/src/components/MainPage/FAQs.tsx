import { Link as ReactRouterLink } from 'react-router-dom';

import {
	Box,
	Text,
	Heading,
	Link,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';

const faqs = [
	{
		question: '如何分享地雷經驗？',
		answer: (
			<>
				如果您還沒有帳號，可以點選右上角登入來新增帳號，如果您有帳號，可以到
				<Link as={ReactRouterLink} color="primary.500" to="/houses">
					所有房屋
				</Link>
				點選右下角 "+" 按鈕來分享地雷經驗。
			</>
		),
	},
	{
		question: '如何管理我的地雷屋？',
		answer: (
			<>
				您可以到
				<Link as={ReactRouterLink} color="primary.500" to="/user/myhouses">
					我的地雷屋
				</Link>
				點選右下角您之前分享過的地雷屋之後，點選編輯，就可以更改您的地雷屋。您也可以點選
				"刪除" 刪除您的地雷屋。
			</>
		),
	},
	{
		question: '如何使用地圖查看地雷屋？',
		answer: (
			<>
				您可以到
				<Link as={ReactRouterLink} color="primary.500" to="/user/map">
					地雷地圖
				</Link>
				查看所有您附近相關的地雷屋。
			</>
		),
	},
	{
		question: '如何使用匿名分享地雷經驗？',
		answer: <>您可以在新增地雷屋時，於發文者欄位，選擇是否以匿名發文。</>,
	},
	{
		question: '請問查看地雷屋是否需要付費？',
		answer: <>地雷屋目前屬於開發試用階段，是不需要支付任何費用的。</>,
	},
	{
		question: '如果地雷屋有不符合事實或汙衊、毀謗之處，如何處理？',
		answer: (
			<>
				地雷屋官方提供匿名檢舉系統，您可以在該地雷屋頁面點選舉報，若經查核有不符合事實或汙衊、毀謗之處，我們會下架該地雷屋。
			</>
		),
	},
];

const FAQs = () => {
	return (
		<Box
			minHeight="90vh"
			py={24}
			display="flex"
			flexDirection={{ base: 'column', lg: 'row' }}
			gap={8}
		>
			<Box
				flex={{ base: 'none', lg: 3 }}
				textAlign={{ base: 'center', lg: 'start' }}
			>
				<Text color="primary.500" fontSize="xl" fontWeight="bold">
					幫助
				</Text>

				{/* Title */}
				<Heading size="2xl" as="h1" mt={8} fontWeight="extrabold">
					問與答
				</Heading>

				{/* Description */}
				<Text fontSize="xl" fontWeight="medium" color="gray.600" mt={8}>
					您需要了解的有關地雷屋的所有資訊。如果您對隱私權有任何疑問，請查看我們的
					<Link as={ReactRouterLink} color="primary.500" to="/privacy">
						隱私權頁面
					</Link>
				</Text>
			</Box>

			{/* Accordion */}
			<Accordion
				flex={{ base: 'none', lg: 4 }}
				defaultIndex={[0]}
				allowMultiple
			>
				{faqs.map((faq, index) => (
					<AccordionItem border={0} mb={8} key={index}>
						<AccordionButton _hover={{ bg: 'none' }} p={0}>
							<Text
								lineHeight={1.75}
								fontWeight="semibold"
								fontSize="xl"
								flex="1"
								textAlign="left"
							>
								{faq.question}
							</Text>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel py={4} px={0} fontSize="lg" color="gray.600">
							{faq.answer}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Box>
	);
};

export default FAQs;
