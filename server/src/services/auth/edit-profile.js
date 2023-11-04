const jwt = require("jwt-simple");

const database = require("../../mongodb");
const User = database.User;

module.exports = async (data) => {
	const token = data.token;

	if (!token && token.split(".").length !== 3) {
		return { status: false, message: "Невалидный токен!" };
	}

	try {
		const decoded = jwt.decode(token, process.env.SECRET);
		await User.findOneAndUpdate(
			{ _id: decoded.userId },
			{ email: data.email, mobile_number: data.phone, login: data.login }
		);
		return { status: true, result: "ok" };
	} catch (e) {
		return { status: false, message: "Неверный токен!" };
	}
};
