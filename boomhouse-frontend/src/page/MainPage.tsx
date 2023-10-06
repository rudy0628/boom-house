import { Container } from '@chakra-ui/react';

import Hero from '../components/MainPage/Hero';
import Features from '../components/MainPage/Features';
import Try from '../components/MainPage/Try';
import WhyUs from '../components/MainPage/WhyUs';
import Testimonials from '../components/MainPage/Testimonials';
import FAQs from '../components/MainPage/FAQs';
import StillHaveQuestion from '../components/MainPage/StillHaveQuestion';
import FooterLink from '../components/MainPage/FooterLink';

const MainPage = () => {
	return (
		<>
			<Container maxWidth="8xl" px={{ base: 4, md: 8 }}>
				<Hero />
				<Features />
				<Try />
				<WhyUs />
			</Container>
			<Testimonials />
			<Container maxWidth="8xl" px={{ base: 4, md: 8 }}>
				<FAQs />
				<StillHaveQuestion />
				<FooterLink />
			</Container>
		</>
	);
};

export default MainPage;
