const Ajv = require('ajv');
const ajv = new Ajv();
const {Schema} = require('mongoose');
const {db} = require('../db');

const schema = {
	required: ['exercises', 'userId'],
	properties: {
		userId: {
			type: 'string'
		},
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
	userId: String,
	exercises: [ExerciseSchema],
	datePerformed: Date
});

const Set = db.model('Set', SetSchema);

module.exports.post = (request, response) => {	
	const userId = request.params.userId;
	const {exercises, datePerformed} = request.body;

	const setData = {
		userId,
		exercises,
		datePerformed
	};

	const valid = ajv.validate(schema, setData);

	if (!valid) {
		response.status(400).send({
			error: {
				code: 'bad_request',
				description: ajv.errors[0].message
			}
		});
	} else {
		setData.datePerformed = setData.datePerformed || new Date();

		const set = new Set(setData);
		
		set.save((err, doc) => {
			if (err) {
				return response.status(500);
			}
			return response.status(201).send(doc.toObject());
		});
	}
};