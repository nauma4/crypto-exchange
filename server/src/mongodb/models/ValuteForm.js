const name = "ValuteForm";

const mongoose = require("mongoose");

let schema = mongoose.Schema({
	valute_id: String,
	type: String,

	title: {
		type: String,
		required: true,
	},

	name: {
		type: String,
		required: true,
	},

	regexp: {
		type: String,
		default: "",
	},

	length: Number,

	max_length: Number,

	required: {
		type: Boolean,
		default: true,
	},
});

schema.methods.saveValid = function () {
	if (!this.valute_id) {
		return Promise.reject("Не указана валюта");
	}
	if (!this.type) {
		return Promise.reject("Не указан тип get/give");
	}
	if (!this.title) {
		return Promise.reject("Не указано название поля");
	}
	if (!this.name) {
		return Promise.reject("Не указано имя поля");
	}
	return this.save();
};

module.exports = {
	[name]: mongoose.model(name, schema),
};
