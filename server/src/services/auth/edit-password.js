const jwt = require("jwt-simple");

const database = require("../../mongodb");
const User = database.User;

module.exports = async (data) => {
	const token = data.token;

	if (!token && String(token).split(".").length !== 3) {
		return { status: false, message: "Невалидный токен!" };
	}

	try {
		const decoded = jwt.decode(token, process.env.SECRET);
		await User.findOne({ _id: decoded.userId }).then((user) => {
			user.setPassword(data.password);
			return user.save();
		});
		return { status: true, result: "Успех!" };
	} catch (e) {
		console.log(e)
		return { status: false, message: "Ошибка!" };
	}
};
