const Ajv = require('ajv');
const ajv = new Ajv();

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
		// TODO: save somewhere
		response.status(201).send('Created');	
	}
};