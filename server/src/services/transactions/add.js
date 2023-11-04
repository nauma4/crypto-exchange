const database = require("../../mongodb");

const Valute = database.Valute;
const Wallet = database.Wallet;
const ValuteForm = database.ValuteForm;
const Transaction = database.Transaction;

const jwt = require("jwt-simple");

module.exports = async function (response) {
	let give = response.give;
	let get = response.get;
	// let token = jwt.decode(response.token, process.env.SECRET);

	if (
		!give ||
		!get ||
		!give.valute_id ||
		!get.valute_id ||
		!give.forms ||
		!get.forms ||
		!give.email
	) {
		return {
			status: false,
			error: true,
			message: `Не все поля заполнены`,
		};
	}

	if (!give.forms.count) {
		return {
			status: false,
			error: true,
			message: `Вы не указали количество, а именно сколько хотите купить`,
		};
	}

	let data = {
		give_valute: {
			valute_id: give.valute_id,
			count: give.forms.count,
		},
		get_valute: {
			valute_id: get.valute_id,
			forms: [],
		},
	};

	let getWallet = await Wallet.findOne({ valute_id: give.valute_id })
		.then((wallet) => {
			data.wallet_id = wallet._id;

			//data.give.course = valute.course
			return wallet;
		})
		.catch(() => {
			return {
				status: false,
				error: true,
				message: `Кошелек не найден`,
			};
		});

	if (getWallet.status === false) return getWallet;

	let giveValute = await Valute.findById(give.valute_id)
		.then((valute) => {
			data.give_valute.course = valute.course;
			return valute;
		})
		.catch(() => {
			return {
				status: false,
				error: true,
				message: `Валюта не найдена`,
			};
		});

	if (giveValute.status === false) return giveValute;

	let getValute = await Valute.findById(get.valute_id)
		.then((valute) => {
			data.get_valute.course = valute.course;
			return valute;
		})
		.catch(() => {
			return {
				status: false,
				error: true,
				message: `Валюта не найдена`,
			};
		});

	if (getValute.status === false) return getValute;

	const validRequired = (form) => {
		// -1 - required and empty, 1 - reuired and fill, 2 - not required and empty, 3 - not required and fill
		if (form.required) {
			return get.forms[form.name] && get.forms[form.name].length > 0 ? 1 : -1;
		} else {
			return get.forms[form.name] && get.forms[form.name].length > 0 ? 3 : 2;
		}
	};

	const validLength = (form) => {
		return form.length
			? get.forms[form.name].length === form.length
			: get.forms[form.name].length <= form.max_length;
	};

	const validContent = (form) => {
		let parts = /\/(.*)\/(.*)/.exec(form.regexp.toString());
		let regexp = new RegExp(parts[1], parts[2]);

		return regexp.test(get.forms[form.name]);
	};

	let setForms = await ValuteForm.find({ valute_id: get.valute_id })
		.then((forms) => {
			for (var i = 0; i < forms.length; i++) {
				let form = forms[i];

				if (validRequired(form) === -1) {
					return {
						status: false,
						error: true,
						message: `Вы не указали поле '${form.name}'`,
					};
				}

				// const validFormLength =
				// 	(validRequired(form) === 1 && !validLength(form)) ||
				// 	(validRequired(form) === 3 && !validLength(form));

				// if (validFormLength) {
				// 	return {
				// 		status: false,
				// 		error: true,
				// 		message: `Неверная длина поля: '${form.name}'`,
				// 	};
				// }

				const validFormContent =
					(validRequired(form) === 1 && !validContent(form)) ||
					(validRequired(form) === 3 && !validContent(form));

				if (validFormContent) {
					return {
						status: false,
						error: true,
						message: `Неверно заполнено поле: '${form.name}'`,
					};
				}

				data.get_valute.forms.push({
					[form.name]: get.forms[form.name],
				});
			}

			return true;
		})
		.catch((e) => {
			console.log(e);
			return {
				status: false,
				error: true,
				message: `Валюта не найдена`,
			};
		});

	if (setForms.status === false) return setForms;

	return await Promise.all([giveValute, getValute, setForms, getWallet]).then(
		async (status) => {
			if (status.includes(false)) return;
			let wallet = status[3];

			return await Transaction.create({ ...data })
				.then((transaction) => {
					return {
						status: true,
						result: {
							id: transaction._id,
							status: transaction.status,
							datetime: transaction.date,
							give: {
								id: transaction.give_valute.valute_id,
								count: transaction.give_valute.count,
								course: transaction.give_valute.course,
								percent_get: status[0].percent_get,
								percent_give: status[0].percent_give,
							},
							get: {
								id: transaction.get_valute.valute_id,
								course: transaction.get_valute.course,
								wallet_number: get.forms.wallet_number,
								percent_get: status[1].percent_get,
								percent_give: status[1].percent_give,
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
					return {
						status: false,
						error: true,
						message: "Не известная ошибка",
					};
				});
		}
	);
};
