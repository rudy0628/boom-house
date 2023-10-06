import { useEffect, useState } from 'react';

// chakra
import {
	Container,
	Heading,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	IconButton,
	Box,
	Spinner,
	Alert,
	AlertIcon,
	useToast,
} from '@chakra-ui/react';

// react router dom
import { useNavigate } from 'react-router-dom';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// icon
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

// type
import { IReport } from '../../type';
import Pagination from '../../components/utils/Pagination';

const ReportsPage = () => {
	// navigate
	const navigate = useNavigate();

	// toast
	const toast = useToast();

	// auth0
	const { user, getAccessTokenSilently } = useAuth0();

	// reports
	const [reports, setReports] = useState<IReport[]>([]);

	// isLoading and error
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	// resolve is Loading and is changed
	const [resolveIsLoading, setResolveIsLoading] = useState(false);
	const [resolveIsChanged, setResolveIsChanged] = useState(false);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const handleResolve = async (violated: boolean, id: string) => {
		setResolveIsLoading(true);

		const url = `${
			import.meta.env.VITE_API_URL_DOMAIN
		}/api/reports/secure/${id}`;

		const token = await getAccessTokenSilently();

		const options = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(violated),
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			setResolveIsLoading(false);
			toast({
				title: '處理檢舉成功！',
				status: 'success',
				isClosable: true,
			});
			setResolveIsChanged(prevState => !prevState);
		} catch (e) {
			setResolveIsLoading(false);
			toast({
				title: '處理檢舉失敗，請再試一次！',
				status: 'error',
				isClosable: true,
			});
		}
	};

	// get all reports
	useEffect(() => {
		const fetchReports = async () => {
			const url = `${
				import.meta.env.VITE_API_URL_DOMAIN
			}/api/reports/findAll?page=${
				currentPage - 1
			}&size=20&adminId=${encodeURIComponent(user?.sub!)}`;

			const response = await fetch(url);

			const responseJson = await response.json();

			const reports = [];
			for (const report of responseJson.content) {
				reports.push(report);
			}

			setTotalPages(responseJson.totalPages);
			setIsLoading(false);
			setReports(reports);
		};

		if (user) {
			fetchReports().catch(() => {
				setIsLoading(false);
				setError('喔！這個頁面好像出了一些狀況，請重新整理試試看！');
			});
		}
	}, [resolveIsChanged, user]);

	// check is admin or not
	useEffect(() => {
		if (user && user.email !== 'admin@boomhouse.com') {
			navigate('/');
		}
	}, [user]);

	return (
		<Container
			maxWidth="8xl"
			px={{ base: 4, md: 8 }}
			pt={4}
			pb={8}
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			<Heading as="h1" size="xl">
				所有檢舉
			</Heading>
			{/* reports */}
			{!isLoading && error === '' && reports.length > 0 && (
				<>
					<TableContainer mt={4} maxWidth="8xl">
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
										<Td display="flex" gap={2}>
											<IconButton
												isLoading={resolveIsLoading}
												colorScheme="green"
												aria-label="is violated"
												icon={<AiOutlineCheck />}
												onClick={() => handleResolve(true, report.id)}
											/>
											<IconButton
												isLoading={resolveIsLoading}
												colorScheme="red"
												aria-label="not violated"
												icon={<AiOutlineClose />}
												onClick={() => handleResolve(false, report.id)}
											/>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
					{/* pagination */}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				</>
			)}

			{/* loading spinner */}
			{isLoading && (
				<Box maxWidth="100%" display="flex" alignItems="center" py={4}>
					<Spinner color="primary.500" />
				</Box>
			)}

			{/* error alert */}
			{!isLoading && error !== '' && (
				<Alert status="error" rounded="md" mt={4}>
					<AlertIcon />
					{error}
				</Alert>
			)}

			{/* error alert */}
			{!isLoading && error === '' && reports.length === 0 && (
				<Alert status="info" rounded="md" mt={4}>
					<AlertIcon />
					目前沒有任何需要處理的檢舉
				</Alert>
			)}
		</Container>
	);
};

export default ReportsPage;
