const LETTERS = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
const WHOLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function generateRandomId() {
	let id = '';
	const addRandomCharacterToId = (list) => {
		const randomIndex = Math.floor(Math.random() * list.length);
		id += list[randomIndex];
	};
	for (let count = 0; count < 2; count++) {
		addRandomCharacterToId(LETTERS);
	}
	for (let count = 0; count < 4; count++) {
		addRandomCharacterToId(WHOLE_NUMBERS);
	}
	return id;
}
