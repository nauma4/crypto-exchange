const Transaction = require("../../database").Transaction;
const Wallet = require("../../database").Wallet;
const Valute = require("../../database").Valute;
const ValuteForm = require("../../database").ValuteForm;
const User = require("../../database").User;

module.exports = async (response) => {
	let result = response.result;

	let type = result.filters && result.filters.type;
	let search = result.filters && result.search;
	let conditions = {};
	if (type === "registered") {
		conditions = { user_id: { $exists: true } };
	}

	if (search) {
		conditions = { ...conditions, $where: `/${search}/.test(this.id.str)` };
	}

	let transactions = await Transaction.find(conditions)
		.sort({ date: -1 })
		.skip(offset)
		.limit(10);

	let promises = transactions.map(async (transaction) => {
		let promises = [];
		promises.push(Wallet.findOne({ _id: transaction.wallet_id }, { name: 1 }));
		promises.push(
			Valute.findOne(
				{ _id: transaction.get_valute.valute_id },
				{ name: 1, percent_get: 1, percent_give: 1 }
			)
		);
		promises.push(
			Valute.findOne(
				{ _id: transaction.give_valute.valute_id },
				{ name: 1, percent_get: 1, percent_give: 1 }
			)
		);
		promises.push(
			ValuteForm.find(
				{ valute_id: transaction.get_valute.valute_id },
				{ title: 1, name: 1 }
			)
		);
		promises.push(
			ValuteForm.find(
				{ valute_id: transaction.give_valute.valute_id },
				{ title: 1, name: 1 }
			)
		);
		transaction.user_id
			? promises.push(User.findOne({ _id: transaction.user_id }))
			: null;

  
		const [wallet,
      getValute,
      giveValute,
      getForms,
      giveForms,
      user] = await Promise.all(promises)
			getForms = transaction.get_valute.forms.map((form) => {
				let valute_form = getForms.find((f) => f.name === Object.keys(form)[0]);
				return {
					title: valute_form.title || "---",
					value: Object.values(form)[0] || "---",
				};
			});

			return {
				...transaction._doc,
				wallet,
				getValute,
				giveValute,
				user,
				getForms,
				giveForms,
			};
	});
	return await Promise.all(promises);

};
