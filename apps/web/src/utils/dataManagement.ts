export const getNestedValue = (obj: any, path: string): any => {
	return path.split('.').reduce((acc, key) => acc && acc[key], obj);
	// return path.split('.').reduce((acc, key) => acc[key], obj);
};
