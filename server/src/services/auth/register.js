const jwt = require("jwt-simple");

const database = require("../../mongodb");
const User = database.User;

module.exports = async function (data) {
	let newUser = new User({ ...data, date: new Date() });

	try {
		const user = await newUser.saveValidity(data.password);

		const token = jwt.encode(
			{
				type: user.type,
				isAuth: true,
				userId: user._id,
			},
			process.env.SECRET
		);

		return {
			status: true,
			result: {
				token,
				email: data.email,
				userId: data._id,
			},
		};
	} catch (e) {
		let message = "Ошибка!";
		console.log(e);
		if (e.errmsg) {
			if (e.errmsg.includes(data.email)) {
				message = "Почта уже занята";
			}
		} else {
			message = e;
		}

		return {
			status: false,
			message,
		};
	}
};
