import React from 'react';

import { Box, IconButton, Select } from '@chakra-ui/react';

import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

interface IProps {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPages }: IProps) => {
	return (
		<Box
			width="100%"
			mt={4}
			display="flex"
			justifyContent="center"
			alignItems="center"
			gap={4}
		>
			{/* left */}
			<IconButton
				aria-label="previous page"
				icon={<BsChevronLeft />}
				variant="outline"
				rounded="full"
				borderColor="primary.500"
				color="primary.500"
				isDisabled={currentPage === 1}
				onClick={() => {
					if (currentPage !== 1) {
						setCurrentPage(prevState => prevState - 1);
						window.scrollTo(0, 0);
					}
				}}
			/>
			{/* select */}
			<Select
				width="auto"
				_focus={{ borderColor: 'primary.500' }}
				value={currentPage}
				onChange={(e: any) => {
					setCurrentPage(+e.target.value);
					window.scrollTo(0, 0);
				}}
			>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
					<option value={number} key={number}>
						{number}
					</option>
				))}
			</Select>
			{/* right */}
			<IconButton
				aria-label="next page"
				icon={<BsChevronRight />}
				variant="outline"
				rounded="full"
				borderColor="primary.500"
				color="primary.500"
				isDisabled={currentPage === totalPages}
				onClick={() => {
					if (currentPage !== totalPages) {
						setCurrentPage(prevState => prevState + 1);
						window.scrollTo(0, 0);
					}
				}}
			/>
		</Box>
	);
};

export default Pagination;
