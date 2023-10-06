import { ReactNode } from 'react';
import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from '@chakra-ui/react';

const FilterListAccordionItem = ({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) => {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box as="span" flex="1" textAlign="left">
					{title}
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4}>{children}</AccordionPanel>
		</AccordionItem>
	);
};

export default FilterListAccordionItem;
