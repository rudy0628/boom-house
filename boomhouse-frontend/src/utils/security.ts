export const preventXSS = (value: string) => {
	const lt = /</g,
		gt = />/g,
		ap = /'/g,
		ic = /"/g;

	value = value
		.toString()
		.replace(lt, '&lt;')
		.replace(gt, '&gt;')
		.replace(ap, '&#39;')
		.replace(ic, '&#34;');

	return value;
};
