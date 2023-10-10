import { useCallback, useState, useEffect } from 'react';

import {
	Container,
	Heading,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputRightElement,
	Textarea,
	Select,
	Switch,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	FormErrorMessage,
	Button,
	InputGroup,
	IconButton,
	Badge,
	Text,
	Image,
	useToast,
} from '@chakra-ui/react';

// icon
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

// validation
import {
	titleIsError,
	addressIsError,
	descriptionIsError,
	tagInputIsError,
} from '../utils/validation';

import { cityAndDistrict } from '../utils/twCityAndDistrict';

// security
import { preventXSS } from '../utils/security';

// auth0
import { useAuth0 } from '@auth0/auth0-react';

// react router dom
import { useNavigate, useParams } from 'react-router-dom';

// drop zone
import { useDropzone } from 'react-dropzone';

const AddOrUpdateHousePage = ({ formType }: { formType: string }) => {
	// params
	const { id } = useParams();

	// isChange
	const [titleIsChange, setTitleIsChange] = useState(false);
	const [addressIsChange, setAddressIsChange] = useState(false);
	const [tagInputIsChange, setTagInputIsChange] = useState(false);
	const [descriptionIsChange, setDescriptionIsChange] = useState(false);

	// form input value
	const [title, setTitle] = useState('');
	const [city, setCity] = useState('');
	const [district, setDistrict] = useState('');
	const [address, setAddress] = useState('');
	const [rating, setRating] = useState(1);
	const [description, setDescription] = useState('');
	const [images, setImages] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [houseType, setHouseType] = useState('整層住家');
	const [anonymousPosted, setAnonymousPosted] = useState(false);

	// isLoading
	const [isLoading, setIsLoading] = useState(false);

	// get token
	const { getAccessTokenSilently, user } = useAuth0();

	// toast
	const toast = useToast();

	// navigate
	const navigate = useNavigate();

	const formHandler = async (e: any) => {
		e.preventDefault();

		// check input is error or not
		if (
			titleIsError(preventXSS(title)) ||
			addressIsError(preventXSS(address)) ||
			descriptionIsError(preventXSS(description)) ||
			images.length === 0 ||
			tags.length === 0 ||
			city.length === 0 ||
			district.length === 0
		) {
			toast({
				title: '輸入內容有誤，請檢查後再試一次',
				status: 'warning',
				isClosable: true,
			});

			return;
		}

		// start loading
		setIsLoading(true);

		// get token
		const token = await getAccessTokenSilently();

		// form input body
		const formInputBody = {
			title: preventXSS(title),
			address: city + district + preventXSS(address),
			rating: rating,
			description: preventXSS(description),
			images: images,
			tags: tags,
			houseType: houseType,
			anonymousPosted: anonymousPosted,
		};

		// headers
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};

		let url = '',
			options = {};
		if (formType === 'add') {
			url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/secure`;

			options = {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(formInputBody),
			};
		} else if (formType === 'update') {
			url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/secure/${id}`;

			options = {
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(formInputBody),
			};
		}

		try {
			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error();
			}

			let urlHouseId;
			if (formType === 'add') {
				urlHouseId = await response.json();
			} else {
				urlHouseId = id;
			}

			// end loading
			setIsLoading(false);

			toast({
				title: `${formType === 'add' ? '新增' : '修改'}新增地雷屋成功`,
				status: 'success',
				isClosable: true,
			});

			navigate(`/houses/${urlHouseId}`);
		} catch (err: any) {
			// end loading
			setIsLoading(false);

			toast({
				title: `${formType === 'add' ? '新增' : '修改'}地雷屋失敗，請再試一次`,
				status: 'error',
				isClosable: true,
			});
		}
	};

	// drop zone
	const onDrop = useCallback((acceptedFiles: any) => {
		acceptedFiles.forEach((file: any) => {
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = function () {
				const dataUrl: any = reader.result;

				setImages(prevState => [...prevState, dataUrl]);
			};

			reader.onerror = function () {
				console.log(reader.error);
			};
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/png': ['.png', '.jpg', '.jpeg'],
		},
	});

	// if form type is update, get the house by id and give it to form
	useEffect(() => {
		if (formType === 'update' && user) {
			const fetchHouse = async () => {
				const url = `${import.meta.env.VITE_API_URL_DOMAIN}/api/houses/${id}`;

				const response = await fetch(url);

				if (!response.ok) {
					navigate('/404');
				}

				const responseJson = await response.json();

				if (user.email !== responseJson.userEmail) {
					navigate('/houses');
				}

				// update input value
				setTitle(responseJson.title);
				setCity(responseJson.address.slice(0, 3));
				setDistrict(responseJson.address.slice(3, 6));
				setAddress(responseJson.address.slice(6));
				setRating(responseJson.rating);
				setDescription(responseJson.description);
				setImages(responseJson.images);
				setTags(responseJson.tags);
				setHouseType(responseJson.houseType);
				setAnonymousPosted(responseJson.anonymousPosted);
			};

			fetchHouse().catch(err => {
				console.log(err);
			});
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
				{formType === 'add' ? '新增地雷屋' : '修改地雷屋'}
			</Heading>

			{/* form */}
			<Box
				display="flex"
				flexDirection="column"
				gap={3}
				width={{ base: '90%', md: '80%', lg: '60%' }}
				mt={8}
			>
				{/* title */}
				<FormControl
					isInvalid={titleIsChange && titleIsError(title)}
					isRequired
				>
					<FormLabel>標題</FormLabel>
					<Input
						focusBorderColor="primary.500"
						type="text"
						value={title}
						onChange={e => {
							setTitle(e.target.value);
							setTitleIsChange(true);
						}}
						placeholder="標題字數限制 50 字以內"
					/>
					{titleIsChange && titleIsError(title) && (
						<FormErrorMessage>請輸入有效標題</FormErrorMessage>
					)}
				</FormControl>

				{/* address */}
				<FormControl
					isInvalid={addressIsChange && addressIsError(address)}
					isRequired
				>
					<FormLabel>地址</FormLabel>
					<Box
						display="flex"
						gap={2}
						flexDirection={{ base: 'column', md: 'row' }}
					>
						<Box flex={1} display="flex" gap={2} alignItems="center">
							{/* 縣市 */}
							<Select
								flex={1}
								onChange={(e: any) => {
									setCity(e.target.value);
									if (e.target.value === '') {
										setDistrict('');
									}
								}}
								value={city}
								focusBorderColor="primary.500"
							>
								<option value="">縣 / 市</option>
								{Object.keys(cityAndDistrict).map(name => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</Select>

							{/* 鄉鎮區 */}
							<Select
								flex={1}
								onChange={e => setDistrict(e.target.value)}
								value={district}
								focusBorderColor="primary.500"
							>
								<option value="">鄉 / 鎮 / 區</option>
								{cityAndDistrict[city] &&
									cityAndDistrict[city].map((name: any) => (
										<option key={name} value={name}>
											{name}
										</option>
									))}
							</Select>
						</Box>
						<Input
							flex={1}
							focusBorderColor="primary.500"
							type="text"
							value={address}
							onChange={e => {
								setAddress(e.target.value);
								setAddressIsChange(true);
							}}
							py={2}
							placeholder="例如：重慶南路一段122號"
						/>
					</Box>
					{addressIsChange && addressIsError(address) && (
						<FormErrorMessage>請輸入有效地址</FormErrorMessage>
					)}
				</FormControl>

				{/* rating */}
				<FormControl isRequired>
					<FormLabel>地雷評分</FormLabel>
					<Slider
						onChange={value => setRating(value)}
						value={rating}
						min={1}
						max={5}
						step={0.1}
					>
						<SliderTrack bg="gray.200">
							<Box position="relative" right={10} />
							<SliderFilledTrack bg="primary.500" />
						</SliderTrack>
						<SliderThumb boxSize={6} p={4} color="primary.500">
							{rating}
						</SliderThumb>
					</Slider>
				</FormControl>

				{/* description */}
				<FormControl
					isInvalid={descriptionIsChange && descriptionIsError(description)}
					isRequired
				>
					<FormLabel>描述</FormLabel>
					<Textarea
						focusBorderColor="primary.500"
						resize="none"
						rows={4}
						value={description}
						onChange={e => {
							setDescription(e.target.value);
							setDescriptionIsChange(true);
						}}
						placeholder="請描述您所遇到的地雷內容"
					/>
					{descriptionIsChange && descriptionIsError(description) && (
						<FormErrorMessage>請輸入有效內容描述</FormErrorMessage>
					)}
				</FormControl>

				{/* image */}
				<FormControl isRequired>
					<FormLabel>圖片</FormLabel>
					{images.length > 0 && (
						<Box display="flex" gap={2} mb={4} flexWrap="wrap">
							{images.map((image, index) => (
								<Box
									key={index}
									height={100}
									width={100}
									rounded="lg"
									overflow="hidden"
									position="relative"
								>
									<Image
										width="100%"
										height="100%"
										objectFit="cover"
										src={image}
									/>
									<IconButton
										size="xs"
										aria-label="remove tag"
										position="absolute"
										top={1}
										right={1}
										color="primary.500"
										icon={<AiOutlineClose />}
										onClick={() => {
											setImages(prevState =>
												prevState.filter(prevImage => prevImage !== image)
											);
										}}
									/>
								</Box>
							))}
						</Box>
					)}
					<Box {...getRootProps()}>
						<input {...getInputProps()} />
						<Button
							leftIcon={<AiOutlinePlus />}
							variant="solid"
							bgColor="primary.500"
							color="white"
							_hover={{ bgColor: 'primary.600' }}
						>
							上傳圖片
						</Button>
					</Box>
				</FormControl>

				{/* tags */}
				<FormControl
					isInvalid={tagInputIsChange && tagInputIsError(tagInput)}
					isRequired
				>
					<FormLabel>標籤</FormLabel>
					{tags.length > 0 && (
						<Box display="flex" gap={2} mb={4} flexWrap="wrap">
							{tags.map((tag, index) => (
								<Badge
									px={2}
									py={1}
									bgColor="primary.100"
									color="primary.500"
									fontSize="sm"
									rounded="md"
									key={index}
									display="flex"
									gap={1}
									alignItems="center"
								>
									<Text>{tag}</Text>
									<IconButton
										size="xs"
										aria-label="remove tag"
										color="primary.500"
										icon={<AiOutlineClose />}
										onClick={() =>
											setTags(prevState =>
												prevState.filter(prevTag => prevTag !== tag)
											)
										}
									/>
								</Badge>
							))}
						</Box>
					)}
					<InputGroup>
						<Input
							focusBorderColor="primary.500"
							type="text"
							value={tagInput}
							onChange={e => {
								setTagInput(e.target.value);
								setTagInputIsChange(true);
							}}
							placeholder="請輸入一些標籤，例如：冷氣不冷、冰箱壞掉"
						/>
						<InputRightElement width="4.5rem" pr={2}>
							<Button
								h="1.75rem"
								px={3}
								size="sm"
								onClick={() => {
									if (!tagInputIsError(tagInput)) {
										const preventXSSTagInput = preventXSS(tagInput);
										setTags(prevState => [...prevState, preventXSSTagInput]);
										setTagInput('');
										setTagInputIsChange(false);
									}
								}}
								bgColor="primary.500"
								color="white"
								_hover={{ bgColor: 'primary.600' }}
							>
								新增標籤
							</Button>
						</InputRightElement>
					</InputGroup>
					{tagInputIsChange && tagInputIsError(tagInput) && (
						<FormErrorMessage>請輸入有效標籤</FormErrorMessage>
					)}
				</FormControl>

				{/* house type */}
				<FormControl isRequired>
					<FormLabel>房屋類型</FormLabel>
					<Select
						focusBorderColor="primary.500"
						value={houseType}
						onChange={e => setHouseType(e.target.value)}
					>
						<option value="整層住家">整層住家</option>
						<option value="獨立套房">獨立套房</option>
						<option value="分租套房">分租套房</option>
						<option value="雅房">雅房</option>
					</Select>
				</FormControl>

				{/* anonymous post */}
				<FormControl isRequired display="flex" alignItems="center">
					<FormLabel>匿名貼文</FormLabel>
					<Switch
						isChecked={anonymousPosted}
						onChange={e => setAnonymousPosted(e.target.checked)}
						color="primary.500"
						size="md"
					/>
				</FormControl>

				{/* submit and cancel button */}
				<Box justifyContent="center" display="flex" gap={2} mt={4}>
					<Button
						isLoading={isLoading}
						bgColor="primary.500"
						color="white"
						_hover={{ bgColor: 'primary.600' }}
						size="md"
						onClick={formHandler}
					>
						送出
					</Button>
					<Button
						isLoading={isLoading}
						color="primary.500"
						borderColor="primary.500"
						_hover={{ bgColor: 'gray.100' }}
						size="md"
						variant="outline"
						onClick={() => navigate(-1)}
					>
						取消
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default AddOrUpdateHousePage;
