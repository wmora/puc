const mongoose = require('mongoose');
const db = mongoose.connection;

exports.db = db;

exports.connect = () => {
	mongoose.Promise = Promise;
	
	db.open('mongodb://localhost:27017/puc', (err) => {
		if (err) {
			console.error('db connection error', err);
		} else {
			console.log('db connection successful');
		}
	});
};