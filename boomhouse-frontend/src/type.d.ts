export interface IHouse {
	id: string;
	title: string;
	address: string;
	rating: Number;
	description: string;
	userEmail: string;
	images: string[];
	tags: string[];
	houseType: string;
	anonymousPosted: boolean;
	favoriteCount: number;
	updateTime: string;
}

export interface IReview {
	id: string;
	houseId: string;
	review: string;
	floor: string;
	user: string;
}

export interface IReport {
	id: string;
	reportId: string;
	type: string;
	thing: string;
	description: string;
	reportEmail: string;
	beReportedEmail: string;
	isResolved: string;
	isViolated: string;
	updateTime: string;
}
