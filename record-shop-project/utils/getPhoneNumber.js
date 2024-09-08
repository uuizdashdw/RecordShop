// Phone Number Logic
const phoneNumberHandler = e => {
	const { value } = e.target;

	let formattedValue = '';

	// Only Numbers
	const cleanedValue = value.replace(/\D/g, '');

	// Formatting Value Logic
	if (cleanedValue.length > 0) formattedValue += cleanedValue.substring(0, 3);

	if (cleanedValue.length >= 4)
		formattedValue += '-' + cleanedValue.substring(3, 7);

	if (cleanedValue.length >= 7)
		formattedValue += '-' + cleanedValue.substring(7, 11);

	return formattedValue;
};

export default phoneNumberHandler;
