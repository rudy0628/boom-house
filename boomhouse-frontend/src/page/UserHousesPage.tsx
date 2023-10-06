import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import {
	Container,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Tab,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Box,
	Spinner,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';

import { IHouse, IReport } from '../type';
import House from '../components/AllHousesPage/House';

const UserHousesPage = () => {
	const { user } = useAuth0();

	// houses, favoriteHouses and reports is loading
	const [housesIsLoading, setHousesIsLoading] = useState(true);
	const [favoritesHousesIsLoading, setFavoritesHousesIsLoading] =
		useState(true);
	const [reportsIsLoading, setReportsIsLoading] = useState(true);

	// error
	const [error, setError] = useState('');

	const [houses, setHouses] = useState<IHouse[]>([]);
	const [favoritesHouses, setFavoriteHouses] = useState<IHouse[]>([]);
	const [reports, setReports] = useState<IReport[]>([]);

	const [favoriteIsChange, setFavoriteIsChange] = useState(false);

	// get all user houses
	useEffect(() => {
		const fetchAllUserHouses = async () => {
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/find/${
				user?.email
			}`;

			const response = await fetch(url);

			const responseJson = await response.json();

			setHouses(responseJson);
			setHousesIsLoading(false);
		};

		if (user) {
			fetchAllUserHouses().catch(() => {
				setHousesIsLoading(false);
				setError('喔！這個頁面好像出了一些狀況，請重新整理試看看！');
			});
		}
	}, [favoriteIsChange]);

	// get all favorite houses
	useEffect(() => {
		const fetchAllUserHouses = async () => {
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/favorite/${
				user?.email
			}`;

			const response = await fetch(url);

			const responseJson = await response.json();

			setFavoriteHouses(responseJson);
			setFavoritesHousesIsLoading(false);
		};

		if (user) {
			fetchAllUserHouses().catch(() => {
				setFavoritesHousesIsLoading(false);
				setError('喔！這個頁面好像出了一些狀況，請重新整理試看看！');
			});
		}
	}, [favoriteIsChange]);

	// get all reports record
	useEffect(() => {
		const fetchAllUserHouses = async () => {
			const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/reports/find/${
				user?.email
			}`;

			const response = await fetch(url);

			const responseJson = await response.json();

			setReports(responseJson);
			setReportsIsLoading(false);
		};

		if (user) {
			fetchAllUserHouses().catch(() => {
				setReportsIsLoading(false);
				setError('喔！這個頁面好像出了一些狀況，請重新整理試看看！');
			});
		}
	}, [favoriteIsChange]);

	return (
		<Container maxWidth="8xl" px={{ base: 4, md: 8 }} pt={4} pb={8}>
			{!housesIsLoading &&
				!favoritesHousesIsLoading &&
				!reportsIsLoading &&
				error === '' && (
					<Tabs variant="enclosed">
						<TabList>
							<Tab _focus={{ color: 'primary.500' }}>所有地雷屋</Tab>
							<Tab _focus={{ color: 'primary.500' }}>地雷屋收藏</Tab>
							<Tab _focus={{ color: 'primary.500' }}>檢舉紀錄</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								{houses.map((house, index) => (
									<House
										setFavoriteIsChange={setFavoriteIsChange}
										house={house}
										key={index}
									/>
								))}
								{houses.length === 0 && (
									<Alert status="info" rounded="md">
										<AlertIcon />
										目前沒有分享過任何地雷屋
									</Alert>
								)}
							</TabPanel>
							<TabPanel>
								{favoritesHouses.map((house, index) => (
									<House
										setFavoriteIsChange={setFavoriteIsChange}
										house={house}
										key={index}
									/>
								))}
								{favoritesHouses.length === 0 && (
									<Alert status="info" rounded="md">
										<AlertIcon />
										目前沒有任何收藏的地雷屋
									</Alert>
								)}
							</TabPanel>
							<TabPanel>
								<Table variant="striped" colorScheme="gray">
									<Thead>
										<Tr>
											<Th>檢舉項目 ID</Th>
											<Th>檢舉項目</Th>
											<Th>檢舉事項</Th>
											<Th>描述</Th>
											<Th>已解決</Th>
											<Th>是否違規</Th>
										</Tr>
									</Thead>
									<Tbody>
										{reports.map(report => (
											<Tr key={report.id}>
												<Td>{report.reportId}</Td>
												<Td>{report.type}</Td>
												<Td>{report.thing}</Td>
												<Td>{report.description}</Td>
												<Td>{report.isResolved ? '已解決' : '未解決'}</Td>
												<Td>
													{!report.isResolved
														? '未知'
														: report.isViolated
														? '違反規則已處理'
														: '未違反規則'}
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
								{reports.length === 0 && (
									<Alert status="info" rounded="md">
										<AlertIcon />
										目前沒有任何檢舉紀錄
									</Alert>
								)}
							</TabPanel>
						</TabPanels>
					</Tabs>
				)}
			{housesIsLoading && favoritesHousesIsLoading && reportsIsLoading && (
				<Box
					maxWidth="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Spinner color="primary.500" />
				</Box>
			)}
			{error !== '' && (
				<Alert rounded="md" status="error">
					<AlertIcon />
					{error}
				</Alert>
			)}
		</Container>
	);
};

export default UserHousesPage;
