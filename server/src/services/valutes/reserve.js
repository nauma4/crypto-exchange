const db = require("../../mongodb");

module.exports = async () => {
	return await db.Valute.find({}, { name: 1, image: 1, reserve: 1, key: 1 })
		.then((data) => {
			let valutes = data.map((valute) => {
				return db.Wallet.find({ valute_id: valute._id }).then((wallets) => ({
					...valute._doc,
					image: global.PUBLIC_PATH + valute.image,
					reserve: wallets.reduce((prev, next) => prev + next.balance, 0),
				}));
			});

			return Promise.all(valutes).then((result) => {
				return {
					status: true,
					result,
				};
			});
		})
		.catch((e) => {
			return {
				status: false,
				message: "Ошибка!",
			};
		});
};
