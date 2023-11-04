const name = 'Transaction'

const mongoose = require('mongoose')

let schema = mongoose.Schema({
	wallet_id: {
		type: String,
		required: true
	},

	order_id: {
		type: Number,
		required: true,
		default: () => Math.floor((Math.random() * 10000000) + 8000),
	},

	status: {
		type: Number,
		default: 0
	},

	give_valute: {
		valute_id: {
			type: String,
			required: true
		},
		count: {
			type: Number,
			required: true,
		},
		course: {
			type: Number,
			required: true
		}
	},

	get_valute: {
		valute_id: {
			type: String,
			required: true
		},
		course: {
			type: Number,
			required: true
		},
		forms: Array
	},

	user_id: String,
	email: String,

	date: {
		type: Date,
		default: new Date()
	},
})

module.exports = {
	[name]: mongoose.model(name, schema)
}
