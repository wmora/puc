const app = require('express')();
const bodyParser = require('body-parser');
const db = require('./db.js');
const setsController = require('./controllers/sets.js');

const PORT = 2424;

app.use(bodyParser.json());

app.post('/users/:userId/sets', (request, response) => {
	setsController.post(request, response);
});

db.connect();

app.listen(PORT, () => console.log(`Running on port ${PORT}`));