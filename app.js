const app = require('express')();
const bodyParser = require('body-parser');
const setsController = require('./controllers/sets.js');

const PORT = 2424;

app.use(bodyParser.json());

app.post('/sets', (request, response) => {
	setsController.post(request, response);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));