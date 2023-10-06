import { useEffect, useState } from 'react';

// chakra
import {
	Box,
	Text,
	Tooltip,
	Avatar,
	Select,
	Textarea,
	Spinner,
	Alert,
	AlertIcon,
	Button,
	useToast,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

import Review from './Review';
import Pagination from '../utils/Pagination';

// type
import { IReview } from '../../type';

const Reviews = ({ houseId }: { houseId: string | undefined }) => {
	// auth0
	const {
		user,
		isLoading: userIsLoading,
		isAuthenticated,
		loginWithRedirect,
		getAccessTokenSilently,
	} = useAuth0();

	// toast
	const toast = useToast();

	// review form
	const [review, setReview] = useState('');
	const [reviewUser, setReviewUser] = useState('');
	const [addReviewIsLoading, setAddReviewIsLoading] = useState(false);

	// reviews
	const [reviews, setReviews] = useState<IReview[]>([]);
	const [reviewsIsChange, setReviewsIsChange] = useState(false);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// isLoading and hasError
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	// add review handler
	const addReviewHandler = async (e: any) => {
		e.preventDefault();

		// check the input is valid
		if (review.trim().length === 0 || reviewUser.length === 0) {
			toast({
				title: '留言格式不正確或尚未選擇身分，請再試一次',
				status: 'warning',
				isClosable: true,
			});
			return;
		}

		// start loading
		setAddReviewIsLoading(true);

		const token = await getAccessTokenSilently();

		const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/reviews/secure`;
		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				houseId: houseId,
				review: review,
				floor: `B${reviews.length + 1}`,
				user: reviewUser,
			}),
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			// end loading
			setAddReviewIsLoading(false);
			// add review refresh the reviews list
			setReviewsIsChange(prevState => !prevState);
			// clear review input
			setReview('');

			// toast notification
			toast({
				title: '新增留言成功！',
				status: 'success',
				isClosable: true,
			});
		} catch (err: any) {
			// end loading
			setAddReviewIsLoading(false);

			toast({
				title: '新增留言失敗，請再試一次！',
				status: 'error',
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		const fetchReviews = async () => {
			if (houseId) {
				const url = `${
					import.meta.env.VITE_API_URL_DOMAIN
				}/api/reviews/find?houseId=${houseId}&page=${currentPage - 1}&size=10`;

				const reviewsResponse = await fetch(url);

				const reviewsResponseJson = await reviewsResponse.json();

				const fetchReviews = [];
				for (const review of reviewsResponseJson.content) {
					fetchReviews.push(review);
				}

				setTotalPages(reviewsResponseJson.totalPages);
				setReviews(fetchReviews);
				setIsLoading(false);
			}
		};

		fetchReviews().catch((err: any) => {
			setError(err.message);
			setIsLoading(false);
		});
	}, [houseId, currentPage, reviewsIsChange]);

	return (
		<Box>
			{/* header */}
			<Box display="flex" alignItems="center" gap={2}>
				<Text fontSize="2xl" fontWeight="bold">
					評論區
				</Text>
				<Tooltip
					label="為保障您的個人權益，請勿留下您的個人資料。評論中禁止任何惡意中傷、汙衊及歧視的言論，違者遭檢舉後，將會下架該留言。"
					fontSize="sm"
					p={2}
					rounded="md"
				>
					<InfoOutlineIcon color="gray.300" />
				</Tooltip>
			</Box>
			{/* review form */}
			{!userIsLoading && isAuthenticated && (
				<Box mt={4}>
					<Box display="flex" alignItems="center" gap={2}>
						<Avatar
							src={user?.picture}
							name={user?.nickname}
							width={10}
							height={10}
							rounded="full"
						/>
						<Box>
							<Select
								width="fit-content"
								variant="unstyled"
								value={reviewUser}
								onChange={e => setReviewUser(e.target.value)}
							>
								<option value="">選擇身分</option>
								<option value={user?.email}>{user?.email}</option>
								<option value="匿名">匿名</option>
							</Select>
							<Text fontSize="sm" color="gray.500">
								B{reviews.length + 1}
							</Text>
						</Box>
					</Box>
					<Box position="relative">
						<Textarea
							placeholder="快來發表你的感想吧！"
							mt={3}
							rows={4}
							_focus={{ borderColor: 'primary.500' }}
							resize="none"
							onChange={e => setReview(e.target.value)}
							value={review}
						/>
						<Button
							isLoading={addReviewIsLoading}
							position="absolute"
							bgColor="primary.500"
							color="white"
							_hover={{ bgColor: 'primary.600' }}
							bottom={2}
							right={2}
							zIndex={100}
							onClick={addReviewHandler}
						>
							送出
						</Button>
					</Box>
				</Box>
			)}

			{/* user loading spinner */}
			{userIsLoading && <Spinner color="primary.500" mt={2} />}

			{/* user is not authenticate */}
			{!userIsLoading && !isAuthenticated && (
				<Alert status="info" mt={2} rounded="md">
					<AlertIcon />
					快點加入地雷屋分享你的想法吧！
					<Button
						color="primary.500"
						variant="link"
						onClick={() => loginWithRedirect()}
					>
						登入
					</Button>
				</Alert>
			)}

			{/* reviews */}
			{!isLoading && reviews.length !== 0 && (
				<Box mt={6} display="flex" flexDirection="column" gap={2}>
					{reviews.map((review, index) => (
						<Review
							key={index}
							review={review}
							setReviewsIsChange={setReviewsIsChange}
						/>
					))}
					{/* pagination */}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				</Box>
			)}

			{/* loading spinner */}
			{isLoading && (
				<Box p={4} display="flex" justifyContent="center">
					<Spinner size="lg" color="primary.500" />
				</Box>
			)}

			{/* error */}
			{!isLoading && error !== '' && (
				<Box p={4}>
					<Alert status="error" rounded="md">
						<AlertIcon />
						{error}
					</Alert>
				</Box>
			)}
		</Box>
	);
};

export default Reviews;
