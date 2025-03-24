const database = require("../../mongodb");

const Transaction = database.Transaction;
const Wallet = database.Wallet;
const Valute = database.Valute;
const ValuteForm = database.ValuteForm;

module.exports = async function (data) {
	let transaction = null;
	if (data.order_id) {
		transaction = await Transaction.findOne({ order_id: data.order_id });
	} else {
		transaction = await Transaction.findById(data.id);
	}
	const wallet = await Wallet.findById(transaction.wallet_id);

	let getValutePercents = Valute.findOne({
		_id: transaction.get_valute.valute_id,
	});
	let giveValutePercents = Valute.findOne({
		_id: transaction.give_valute.valute_id,
	});

	let getValuteForms = await ValuteForm.find({
		valute_id: transaction.get_valute.valute_id,
	});

	return await Promise.all([getValutePercents, giveValutePercents])
		.then((results) => {
			let forms = [];

			transaction.get_valute.forms.forEach((_form) => {
				getValuteForms.filter(({ name, title }) => {
          if (name === Object.keys(_form)[0]) {
						forms.push({
							name,
							title,
							text: _form[name],
						});
					}
        });
			});

			return {
				status: true,
				result: {
					id: transaction._id,
					order_id: transaction.order_id,
					status: transaction.status,
					datetime: transaction.date,
					give: {
						id: transaction.give_valute.valute_id,
						name: results[1].name,
						key: results[1].key,
						image: global.PUBLIC_PATH + results[1].image,
						count: transaction.give_valute.count,
						course: transaction.give_valute.course,
						percent_get: results[1].percent_get,
						percent_give: results[1].percent_give,
						email: transaction.give_valute.email,
					},
					get: {
						id: transaction.get_valute.valute_id,
						course: transaction.get_valute.course,
						name: results[0].name,
						key: results[0].key,
						image: global.PUBLIC_PATH + results[0].image,
						percent_get: results[0].percent_get,
						percent_give: results[0].percent_give,
						forms,
					},
					wallet: wallet.data.map((form) => {
						return {
							name: form.name,
							text: form.text,
						};
					}),
				},
			};
		})
		.catch((err) => {
			console.log(err);
			return {
				status: false,
				error: true,
				message: "Транзакции с указаным ИД не найдено",
			};
		});
};
