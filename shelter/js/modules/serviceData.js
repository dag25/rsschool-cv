
const jsonFile = 'data/pets.json';

export const getData = await fetch(jsonFile)
	.then(response => response.json())
	.catch(error => console.error('Error:', error));
