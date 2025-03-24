const database = require('../../mongodb')

const ValuteForm = database.ValuteForm
const Valute = database.Valute
const Wallet = database.Wallet

module.exports = async function valute (_id, type) {
	return Valute.findById(_id)
		.then(valute => {
			return Wallet.find({ valute_id: valute._id })
				.then(wallets => {
					return {
						status: true,
						valute: {
							id: valute._id,
							name: valute.name,
							key: valute.key,
							name: valute.name,
							image: global.PUBLIC_PATH+valute.image,
							min_give: valute.min_give,
							reserve: wallets.reduce((prev, next) => prev + next.balance, 0),
							course: valute.course,
						},
						result: []
					}
				})
		})
		.then(forms => {
			return ValuteForm.find({ valute_id: forms.valute.id, type })
				.then(data => {
					data.map(form => {
						forms.result.push({
							name: form.name,
							title: form.title,
							placeholder: form.placeholder,
							regexp: form.regexp,
							required: form.required,
							length: form.length ? form.length : null,
							max_length: form.max_length ? form.max_length : null,
						})
					})

					return forms
				})
				.catch(err => {
					return {
						status: true,
						valute: {
							id: valute._id,
							name: valute.name,
							key: valute.key,
							name: valute.name,
							image: global.PUBLIC_PATH+valute.image,
							min_give: valute.min_give,
							reserve: valute.reserve,
							course: valute.course,
						},
						result: []
					}
				})
		})
		.catch(e => {
			return {
				status: false,
				message: 'Valute not found'
			}
		})
}
