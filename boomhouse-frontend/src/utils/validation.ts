export const titleIsError = (title: string) =>
	title.trim().length === 0 || title.trim().length > 50;

export const addressIsError = (address: string) => address.trim().length === 0;

export const descriptionIsError = (description: string) =>
	description.trim().length === 0;

export const tagInputIsError = (tagInput: string) =>
	tagInput.trim().length === 0 || tagInput.trim().length > 10;
