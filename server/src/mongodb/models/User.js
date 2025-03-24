const name = "User";

const mongoose = require("mongoose");
const crypto = require("crypto");

let schema = mongoose.Schema({
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},

	hash: String,

	salt: String,

	type: {
		type: Number,
		default: 1, // by default is simple user, 2 - admin, 3 - moderator
	},

	fullName: String,
	mobile_number: String,
	login: String,
	referal: String,

	date: {
		type: Date,
		default: new Date(),
	},
});

schema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString("hex");

	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
		.toString("hex");
};

schema.methods.validPassword = function (password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
		.toString("hex");

	return this.hash === hash;
};

const baseValidator = (ctx) => {
	function validateEmail(email) {
		var re =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	if (!ctx._doc.email && !ctx.password && !ctx._doc.login) {
		return { status: false, err: "Поля не заполнены!" };
	}

	if (!ctx._doc.email) {
		return { status: false, err: "Укажите e-mail!" };
	}

	if (!ctx.password) {
		return { status: false, err: "Укажите пароль!" };
	}

	if (!validateEmail(ctx._doc.email)) {
		return { status: false, err: "Неправильный email" };
	}

	if (ctx.password.length < 6) {
		return { status: false, err: "Слишком простой пароль" };
	}

	if (ctx.password.length > 20) {
		return { status: false, err: "Слишком большой пароль" };
	}

	return { status: true };
};

schema.methods.saveValidity = function (password) {
	const valid = baseValidator({ ...this, password });

	if (!valid.status) {
		return Promise.reject(valid.err);
	}

	this.salt = crypto.randomBytes(16).toString("hex");

	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 512, "sha512")
		.toString("hex");

	return this.save();
};

module.exports = {
	[name]: mongoose.model(name, schema),
};
