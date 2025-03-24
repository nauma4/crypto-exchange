const name = 'ValuteCategories'

const mongoose = require('mongoose')

let schema = mongoose.Schema({
  name: String,
	key: String,
})

const baseValidator = (data) => {

	if (!data.name && !data.key) {
		return { status: false, err: 'Укажите название и ключ категории' }
	}

	if (!data.name) {
		return { status: false, err: 'Укажите название категории' }
	}

	if (!data.key) {
		return  { status: false, err: 'Укажите ключ категории' }
	}

	return { status: true }
}

schema.methods.saveValid = function () {

	let valid = baseValidator(data)

	if (valid.status == false) {
		return Promise.reject(valid.err)
	}

	return mongoose.model(name, schema).findOne({ name: this.name })
		.then(valuteCat => {
			if (valuteCat) {
				return Promise.reject('Такая категория уже есть!')
			} else {
				return this.save()
			}
		})
}

schema.statics.findByIdAndUpdateValid = function (id, data) {
	if (!id) {
		return Promise.reject('Укажите категорию')
	}

	let valid = baseValidator(data)

	if (valid.status == false) {
		return Promise.reject(valid.err)
	} 

	return mongoose.model(name, schema).findById(id)
		.then(valuteCat => {
			if (!valuteCat) {
				return Promise.reject('Такой категории нет')
			} else {
				valuteCat = { ...valuteCat._doc, ...data }
				return valuteCat.save()
			}
		})
	
}


module.exports = {
	[name]: mongoose.model(name, schema)
}
