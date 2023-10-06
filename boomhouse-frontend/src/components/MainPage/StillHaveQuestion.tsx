import { Box, Text, Button, Link } from '@chakra-ui/react';

const StillHaveQuestion = () => {
	return (
		<Box
			px={{ base: 6, md: 16 }}
			py={16}
			bgColor="gray.50"
			display="flex"
			flexDirection="column"
			alignItems="center"
			gap={6}
			rounded="lg"
		>
			{/* Text */}
			<Text fontSize="3xl" fontWeight="extrabold">
				還有任何問題嗎？
			</Text>
			<Text
				fontSize="xl"
				fontWeight="medium"
				mb={{ base: 6, lg: 0 }}
				color="gray.600"
			>
				如果您未找到您想要的解答，地雷屋團隊歡迎您透過 E-mail 聯絡我們
			</Text>
			{/* Button */}
			<Button
				as={Link}
				href="mailto:s3352250zz@gmail.com"
				color="white"
				bgColor="primary.500"
				_hover={{ bgColor: 'primary.600', textDecoration: 'none' }}
				size="lg"
			>
				填寫 E-mail 聯絡我們
			</Button>
		</Box>
	);
};

export default StillHaveQuestion;
