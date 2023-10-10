import {
	Box,
	Container,
	Heading,
	Text,
	UnorderedList,
	ListItem,
	Link,
} from '@chakra-ui/react';

const PrivacyPage = () => {
	return (
		<Container
			py={4}
			maxWidth="3xl"
			display="flex"
			flexDirection="column"
			gap={6}
		>
			<Heading as="h1" size="xl" textAlign="center">
				隱私權宣告
			</Heading>

			<Text>
				非常歡迎您光臨「地雷屋」
				（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
			</Text>

			{/* 1 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					一、 隱私權保護政策的適用範圍
				</Text>
				<UnorderedList>
					<ListItem>
						隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。
					</ListItem>
					<ListItem>
						隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
					</ListItem>
				</UnorderedList>
			</Box>

			{/* 2 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					二、 個人資料的蒐集、處理及利用方式
				</Text>
				<UnorderedList>
					<ListItem>
						當您蒞臨本網站或參與本網站活動時，我們將視活動性質請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料。
					</ListItem>
					<ListItem>
						本網站蒐集足以識別使用者身分的個人資料、消費與交易資料，或日後經您同意而提供之其他個人資料，都僅供本網站於其內部、依照蒐集之目的進行處理和利用、或為完成提供服務或履行合約義務之必要、或依照相關法令規定或有權政府機關之命令或要求，否則
						本網站不會將足以識別使用者身分的個人資料提供給第三人（包括境內及境外）、或移作蒐集目的以外之使用。
					</ListItem>
				</UnorderedList>
			</Box>

			{/* 3 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					三、 資料之保護
				</Text>
				<UnorderedList>
					<ListItem>
						本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
					</ListItem>
					<ListItem>
						如因業務需要有必要委託本網站相關單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
					</ListItem>
				</UnorderedList>
			</Box>

			{/* 4 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					四、 網站對外的相關連結
				</Text>
				<Text>
					本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
				</Text>
			</Box>

			{/* 5 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					五、 與第三人共用個人資料之政策
				</Text>
				<Text mb={2}>
					本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
				</Text>
				<Text mb={2}>前項但書之情形包括不限於：</Text>
				<UnorderedList>
					<ListItem>經由您同意。</ListItem>
					<ListItem>法律明文規定。</ListItem>
					<ListItem>為維護國家安全或增進公共利益。</ListItem>
					<ListItem>為免除您生命、身體、自由或財產上之危險。</ListItem>
					<ListItem>
						當您在本網站的行為，違反本網站的服務條款或可能損害或妨礙本網站權益或導致任何人遭受損害時，經本網站揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
					</ListItem>
					<ListItem>有利於您的權益。</ListItem>
					<ListItem>
						本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。
					</ListItem>
				</UnorderedList>
			</Box>

			{/* 6 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					六、 Cookie 之使用
				</Text>
				<Text mb={2}>
					為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行
					。
				</Text>
				<Text mb={2}>如何關閉 Cookie？</Text>
				<Text mb={2}>
					瀏覽器允許您更改 Cookie 的設定。
					這些設定可以在您的瀏覽器選單上的「選項」或 「設定」找到。
					如欲了解更多這些設定，可參考下列的連結，對您可能有幫助。
				</Text>
				<UnorderedList>
					<ListItem>
						<Link
							href="https://support.google.com/chrome/answer/95647?hl=zh-Hant"
							color="primary.500"
							target="_blank"
						>
							Chrome™ 的 Cookie 設定
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href="https://support.mozilla.org/zh-TW/kb/cookies-information-websites-store-on-your-computer"
							color="primary.500"
							target="_blank"
						>
							Firefox® 的 Cookie 設定
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href="https://support.microsoft.com/zh-tw/windows/%E5%88%AA%E9%99%A4%E8%88%87%E7%AE%A1%E7%90%86-cookie-168dab11-0753-043d-7c16-ede5947fc64d"
							color="primary.500"
							target="_blank"
						>
							Internet Explorer® 的 Cookie 設定
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href="https://support.apple.com/zh-tw/HT201265"
							color="primary.500"
							target="_blank"
						>
							Safari® 的 Cookie 設定
						</Link>
					</ListItem>
				</UnorderedList>
			</Box>

			{/* 7 */}
			<Box>
				<Text fontWeight="bold" mb={2}>
					七、 隱私權保護政策之修正
				</Text>
				<Text>
					本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
				</Text>
			</Box>
		</Container>
	);
};

export default PrivacyPage;
