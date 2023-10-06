import { Box, Container, Heading, Avatar, Text } from '@chakra-ui/react';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
	{
		testimonial:
			'地雷屋真的是相當好用的網站，我已經在上面分享超過20篇地雷經驗了',
		name: '中和吳孟達',
		position: '分享超過 20 篇地雷租屋經驗',
	},
	{
		testimonial:
			'地雷屋真的是相當好用的網站，能幫助我在租屋之前篩選房屋，不再踩到地雷',
		name: '新莊張學友',
		position: '使用地雷屋超過 6 個月',
	},
	{
		testimonial: '我們團隊會持續開發更多的功能，讓使用者有更好的體驗',
		name: '葉世平',
		position: '地雷屋開發團隊',
	},
];

const Testimonials = () => {
	return (
		<Box bgColor="gray.50">
			<Container px={8} py={24} w="100%" maxWidth="7xl">
				<Swiper
					pagination={true}
					modules={[Pagination, Autoplay]}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								gap={8}
							>
								{/* testimonial */}
								<Heading size="xl" as="h2" textAlign="center">
									{testimonial.testimonial}
								</Heading>
								{/* avatar */}
								<Avatar size="lg" />
								{/* name and position */}
								<Box>
									<Text fontSize="xl" fontWeight="bold" textAlign="center">
										{testimonial.name}
									</Text>
									<Text
										fontSize="xl"
										textAlign="center"
										color="gray.600"
										mt={2}
									>
										{testimonial.position}
									</Text>
								</Box>
							</Box>
						</SwiperSlide>
					))}
				</Swiper>
			</Container>
		</Box>
	);
};

export default Testimonials;
