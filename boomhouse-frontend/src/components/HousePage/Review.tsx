import { useState } from 'react';

import {
	Card,
	CardBody,
	Text,
	Box,
	Avatar,
	Button,
	Alert,
	AlertIcon,
	useToast,
} from '@chakra-ui/react';

import { useAuth0 } from '@auth0/auth0-react';

import { IReview } from '../../type';
import ReportModal from '../utils/ReportModal';

const Review = ({
	review,
	setReviewsIsChange,
}: {
	review: IReview;
	setReviewsIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const toast = useToast();
	const { user, getAccessTokenSilently } = useAuth0();

	const [deleteReviewIsLoading, setDeleteReviewIsLoading] = useState(false);
	const [reportModalIsOpen, setReportModalIsOpen] = useState(false);

	const deleteReviewHandler = async () => {
		if (review.review.length === 0) {
			return;
		}

		setDeleteReviewIsLoading(true);
		const url = `${
			import.meta.env.VITE_API_URL_DOMAIN
		}/api/reviews/secure?reviewId=${review.id}`;

		const token = await getAccessTokenSilently();

		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			setDeleteReviewIsLoading(false);
			setReviewsIsChange(prevState => !prevState);
			toast({
				title: '刪除留言成功',
				status: 'success',
				isClosable: true,
			});
		} catch (e: any) {
			setDeleteReviewIsLoading(false);
			toast({
				title: '刪除留言失敗，請再試一次',
				status: 'error',
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Card variant="outline">
				<CardBody>
					{review.review.length > 0 && (
						<>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Box display="flex" alignItems="center" gap={2}>
									<Avatar width={10} height={10} rounded="full" />
									<Box>
										<Text>{review.user}</Text>
										<Text fontSize="sm" color="gray.500">
											{review.floor}
										</Text>
									</Box>
								</Box>
								{user?.email === review.user ? (
									<Button
										isLoading={deleteReviewIsLoading}
										colorScheme="red"
										variant="solid"
										size="sm"
										onClick={deleteReviewHandler}
									>
										刪除
									</Button>
								) : (
									<Button onClick={() => setReportModalIsOpen(true)}>
										檢舉
									</Button>
								)}
							</Box>
							<Text mt={4}>{review.review}</Text>
						</>
					)}
					{review.review.length === 0 && (
						<Alert status="info" rounded="md">
							<AlertIcon />
							這則留言已被刪除，就像變了心的女朋友，回不來了～
						</Alert>
					)}
				</CardBody>
			</Card>
			<ReportModal
				reportModalIsOpen={reportModalIsOpen}
				setReportModalIsOpen={setReportModalIsOpen}
				reportId={review.id}
				type="評論"
				beReportedEmail={review.user}
			/>
		</>
	);
};

export default Review;
