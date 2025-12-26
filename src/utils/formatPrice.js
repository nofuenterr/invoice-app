const formatPrice = (price) => {
	let counter = 0;
	let parsedPrice = [];

	const normalizedPrice = Number(price).toFixed(2);

	normalizedPrice
		.toString()
		.split('')
		.reverse()
		.forEach((c) => {
			if (counter === 3) {
				parsedPrice.push(',');
				counter = 0;
			}
			parsedPrice.push(c);
			c === '.' ? (counter = 0) : (counter += 1);
		});

	return parsedPrice.reverse().join('');
};

export default formatPrice;
