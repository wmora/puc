const db = require('mongoose');

exports.connect = () => {
	db.connect('mongodb://localhost/puc', { useMongoClient: true }, (err) => {
		if (err) {
			console.error.bind(console, 'connection error:');
		} else {
			console.log('db connection successful');
		}
	});
};