import React, { useState } from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Textarea,
	FormControl,
	FormLabel,
	Select,
	useToast,
} from '@chakra-ui/react';

import { useAuth0 } from '@auth0/auth0-react';

import { reportThings } from '../../utils/reportThings';

interface IReportModal {
	reportModalIsOpen: boolean;
	setReportModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	reportId: string;
	type: string;
	beReportedEmail: string;
}

const ReportModal = ({
	reportModalIsOpen,
	setReportModalIsOpen,
	reportId,
	type,
	beReportedEmail,
}: IReportModal) => {
	// auth0
	const { user, getAccessTokenSilently } = useAuth0();

	// toast
	const toast = useToast();

	const [thing, setThing] = useState('');
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const modalCloseHandler = () => {
		setDescription('');
		setThing('');
		setReportModalIsOpen(false);
	};

	const createReportHandler = async (e: any) => {
		e.preventDefault();

		// check input has error
		if (thing === '' || description === '') {
			toast({
				title: '輸入內容有誤，請檢查後重新送出',
				status: 'error',
				isClosable: true,
			});
			return;
		}

		setIsLoading(true);

		const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/reports/secure`;

		const token = await getAccessTokenSilently();

		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				reportId: reportId,
				type: type,
				thing: thing,
				description: description,
				reportEmail: user?.email,
				beReportedEmail: beReportedEmail,
			}),
		};

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			setIsLoading(false);
			modalCloseHandler();

			toast({
				title: '檢舉已送出，我們會盡快給您回覆',
				status: 'success',
				isClosable: true,
			});
		} catch (e: any) {
			setIsLoading(false);
			toast({
				title: '檢舉失敗，請再試一次',
				status: 'error',
				isClosable: true,
			});
		}
	};

	return (
		<Modal isOpen={reportModalIsOpen} onClose={modalCloseHandler} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>檢舉</ModalHeader>
				<ModalCloseButton />
				<ModalBody display="flex" flexDirection="column" gap={4}>
					{/* reportId */}
					<Text>檢舉事項 ID：{reportId}</Text>
					{/* type */}
					<Text>檢舉項目：{type}</Text>
					{/* thing */}
					<FormControl isRequired>
						<FormLabel>違規事項：</FormLabel>
						<Select
							size="sm"
							rounded="md"
							focusBorderColor="primary.500"
							onChange={e => setThing(e.target.value)}
							value={thing}
						>
							<option value="">選擇違規事項（必要）</option>
							{reportThings.map((thing, index) => (
								<option key={index} value={thing}>
									{thing}
								</option>
							))}
						</Select>
					</FormControl>
					{/* description */}
					<FormControl isRequired>
						<FormLabel>違規事項描述：</FormLabel>
						<Textarea
							rows={4}
							focusBorderColor="primary.500"
							placeholder="請詳細描述違規事項（內容不可為空白）"
							size="sm"
							rounded="md"
							resize="none"
							onChange={e => setDescription(e.target.value)}
						/>
					</FormControl>
				</ModalBody>

				{/* buttons */}
				<ModalFooter>
					<Button
						isLoading={isLoading}
						bgColor="primary.500"
						color="white"
						_hover={{ bgColor: 'primary.600' }}
						mr={3}
						onClick={createReportHandler}
					>
						送出
					</Button>
					<Button
						isLoading={isLoading}
						variant="ghost"
						onClick={modalCloseHandler}
					>
						取消
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ReportModal;
