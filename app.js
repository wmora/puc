const app = require('express')();
const PORT = 2424;

app.get('/', (request, response) => {
	response.send('Hello world!');
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));