import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import {
	Card,
	CardBody,
	Accordion,
	Box,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerBody,
	RadioGroup,
	Radio,
	Text,
	Stack,
	Select,
} from '@chakra-ui/react';

import FilterListAccordionItem from './FilterListAccordionItem';

import { cityAndDistrict } from '../../utils/twCityAndDistrict';

interface IProps {
	isFilterTabOpened: boolean;
	setIsFilterTabOpened: Dispatch<SetStateAction<boolean>>;
	isLessThanMd: boolean;
	setHousesApiUrl: Dispatch<SetStateAction<string>>;
}

const FilterListBox = ({
	setHousesApiUrl,
}: {
	setHousesApiUrl: Dispatch<SetStateAction<string>>;
}) => {
	const [sortBy, setSortBy] = useState('updateTime');
	const [descOrAsc, setDescOrAsc] = useState('desc');
	const [ratingFilter, setRatingFilter] = useState('0');
	const [houseTypeFilter, setHouseTypeFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [districtFilter, setDistrictFilter] = useState('');

	const cityAndCountry = Object.keys(cityAndDistrict);

	useEffect(() => {
		setHousesApiUrl(
			`${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/find?address=${
				cityFilter + districtFilter
			}&houseType=${houseTypeFilter}&rating=${ratingFilter}&sortBy=${sortBy}&descOrAsc=${descOrAsc}`
		);
	}, [
		sortBy,
		descOrAsc,
		ratingFilter,
		houseTypeFilter,
		cityFilter,
		districtFilter,
	]);

	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			{/* Date */}
			<FilterListAccordionItem title="時間排序">
				<RadioGroup
					onChange={value => {
						setSortBy('updateTime');
						setDescOrAsc(value);
					}}
					value={sortBy === 'updateTime' ? descOrAsc : ''}
				>
					<Stack direction="column">
						<Radio value="desc">由近到遠</Radio>
						<Radio value="asc">由遠到近</Radio>
					</Stack>
				</RadioGroup>
			</FilterListAccordionItem>

			{/* favorite amount */}
			<FilterListAccordionItem title="收藏人數">
				<RadioGroup
					onChange={value => {
						setSortBy('favoriteCount');
						setDescOrAsc(value);
					}}
					value={sortBy === 'favoriteCount' ? descOrAsc : ''}
				>
					<Stack direction="column">
						<Radio value="desc">由多到少</Radio>
						<Radio value="asc">由少到多</Radio>
					</Stack>
				</RadioGroup>
			</FilterListAccordionItem>

			{/* Rating */}
			<FilterListAccordionItem title="地雷指數">
				<RadioGroup onChange={setRatingFilter} value={ratingFilter}>
					<Stack direction="column">
						<Radio value="5">5.0</Radio>
						<Radio value="4">4.0 以上</Radio>
						<Radio value="3">3.0 以上</Radio>
						<Radio value="2">2.0 以上</Radio>
						<Radio value="1">1.0 以上</Radio>
						<Radio value="0">不拘</Radio>
					</Stack>
				</RadioGroup>
			</FilterListAccordionItem>

			{/* houseType */}
			<FilterListAccordionItem title="房屋類型">
				<RadioGroup onChange={setHouseTypeFilter} value={houseTypeFilter}>
					<Stack direction="column">
						<Radio value="">不拘</Radio>
						<Radio value="整層住家">整層住家</Radio>
						<Radio value="獨立套房">獨立套房</Radio>
						<Radio value="分租套房">分租套房</Radio>
						<Radio value="雅房">雅房</Radio>
					</Stack>
				</RadioGroup>
			</FilterListAccordionItem>

			{/* location */}
			<FilterListAccordionItem title="位置">
				<RadioGroup>
					<Stack direction="column">
						{/* 縣市 */}
						<Box display="flex" alignItems="center">
							<Text>縣 / 市：</Text>
							<Select
								width="fit-content"
								onChange={(e: any) => {
									setCityFilter(e.target.value);
									if (e.target.value === '') {
										setDistrictFilter('');
									}
								}}
								value={cityFilter}
							>
								<option value="">選擇</option>
								{cityAndCountry.map(name => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</Select>
						</Box>
						{/* 鄉鎮區 */}
						<Box display="flex" alignItems="center">
							<Text>鄉 / 鎮 / 區：</Text>
							<Select
								width="fit-content"
								onChange={e => setDistrictFilter(e.target.value)}
								value={districtFilter}
							>
								<option value="">選擇</option>
								{cityAndDistrict[cityFilter] &&
									cityAndDistrict[cityFilter].map((name: any) => (
										<option key={name} value={name}>
											{name}
										</option>
									))}
							</Select>
						</Box>
					</Stack>
				</RadioGroup>
			</FilterListAccordionItem>
		</Accordion>
	);
};

const HouseFilterList = ({
	isFilterTabOpened,
	setIsFilterTabOpened,
	isLessThanMd,
	setHousesApiUrl,
}: IProps) => {
	return (
		<>
			{/* desktop filter list */}
			<Box display={{ base: 'none', md: 'block' }} width="280px">
				<Card>
					<CardBody display="flex" flexDirection="column" gap={4}>
						<FilterListBox setHousesApiUrl={setHousesApiUrl} />
					</CardBody>
				</Card>
			</Box>

			{/* mobile filter list tab */}
			<Drawer
				onClose={() => setIsFilterTabOpened(false)}
				isOpen={isFilterTabOpened && isLessThanMd}
				size="xs"
				placement="left"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerBody py={14}>
						<FilterListBox setHousesApiUrl={setHousesApiUrl} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default HouseFilterList;
