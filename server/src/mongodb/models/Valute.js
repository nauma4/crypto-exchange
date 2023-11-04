const name = 'Valute'

const mongoose = require('mongoose')

let schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	key: String,
	is_get: Number,
	is_give: Number,
	image: String,
	min_give: Number,
	max_get: Number,
	percent_give: {
		type: Number,
		default: 0.95
	},
	percent_get: {
		type: Number,
		default: 1.05
	},
	course: {
		type: Number,
		default: 1
	}
})

schema.methods.saveValid = function () {

	if (!this.name) {
		return Promise.reject('Укажите название валюты')
	}

	if (!this.image) {
		return Promise.reject('Укажите иконку валюты')
	}

	if (this.is_get === undefined) {
		return Promise.reject('Укажите, можно ли купить эту валюту')
	}

	if (this.is_give === undefined) {
		return Promise.reject('Укажите, можно ли продать эту валюту')
	}

	if (this.is_get === 0 && this.is_give === 0) {
		return Promise.reject('Валюта должна быть покупаемой/продаваемой')
	}

	if (!this.course) {
		return Promise.reject('Не указан курс')
	}


	return this.save()
}

module.exports = {
	[name]: mongoose.model(name, schema)
}
