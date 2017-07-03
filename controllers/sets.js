const Ajv = require('ajv');
const ajv = new Ajv();
const {Schema} = require('mongoose');
const {db} = require('../db');

const schema = {
	required: ['exercises'],
	properties: {
		exercises: {
			type: 'array'
		},
		datePerformed: {
			type: 'string'
		}
	}
};

const ExerciseSchema = new Schema({
	type: String,
	count: Number
});

const SetSchema = new Schema({
	exercises: [ExerciseSchema],
	datePerformed: Date
});

const Set = db.model('Set', SetSchema);

module.exports.post = (request, response) => {	
	const valid = ajv.validate(schema, request.body);

	if (!valid) {
		response.status(400).send({
			error: {
				code: 'bad_request',
				description: ajv.errors[0].message
			}
		});
	} else {
		if (!request.body.datePerformed) {
			request.body.datePerformed = new Date();
		}
		
		const {exercises, datePerformed} = request.body;

		const set = new Set({
			exercises,
			datePerformed
		});
		
		set.save((err, doc) => {
			if (err) {
				return response.status(500);
			}
			return response.status(201).send(doc.toObject());
		});
	}
};