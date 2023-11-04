const jwt = require("jwt-simple");

const database = require("../../mongodb");
const User = database.User;

module.exports = async (data) => {
	const token = data.token;

	try {
		const decoded = jwt.decode(token, process.env.SECRET);

		const user = await User.findOne({ _id: decoded.userId });
		let result = {
			general: {
				email: user.email,
				login: user.login,
				fullname: user.fullname,
				phone: user.mobile_number,
			},

			referal_link: user._id,

			referals: [],
		};

		let referals = await User.find({ referal: user._id }).then((users) => {
			return users.map((user) => {
				return {
					login: user.login,
					email: user.email,
					fullname: user.fullname,
					number: user.number,
				};
			});
		});

		result.referals = referals;

		return result;
	} catch (e) {
		return { status: false, error: true, message: e?.message };
	}
};
