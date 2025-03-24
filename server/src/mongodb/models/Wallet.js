const name = "Wallet";

const mongoose = require("mongoose");

let form = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

let schema = mongoose.Schema({
	valute_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		default: 0,
	},
	data: [form],
});

const baseValidator = (ctx) => {
	if (Object.keys(ctx).length === 1) {
		return { status: false, err: "Информация о валюте и формах обязательна!" };
	}

	if (!ctx.name) {
		return { status: false, err: "Не указано название кошелька!" };
	}

	if (!ctx.balance) {
		return { status: false, err: "Не указан баланс кошелька" };
	}

	if (!ctx.data.length) {
		return { status: false, err: "Не указаны данные кошелька!" };
	}

	ctx.data.forEach((field) => {
		if (!field.name || !field.text) {
			return { status: false, err: "Название и содержания полей обязательно!" };
		}
	});
	return { status: true };
};

schema.methods.saveValid = function () {
	let valid = baseValidator(this);

	if (!valid.status) {
		return Promise.reject(valid.err);
	}
	return this.save();
};

schema.statics.updateValid = function (id, update) {
	if (!id) {
		return Promise.reject("Не указан кошелек");
	}

	let valid = baseValidator(update);

	if (!valid.status) {
		return Promise.reject(valid.err);
	}

	return mongoose.model(name, schema).findByIdAndUpdate(id, update);
};

module.exports = {
	[name]: mongoose.model(name, schema),
};
