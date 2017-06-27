const app = require('express')();
const setsController = require('./controllers/sets.js');

const PORT = 2424;

app.post('/sets', (request, response) => {
	setsController.post(request, response);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));