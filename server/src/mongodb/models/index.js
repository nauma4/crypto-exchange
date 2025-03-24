const User = require('./User')
const Valute = require('./Valute')
const ValuteForm = require('./ValuteForm')
const ValuteCategories = require('./ValuteCategories')
const Wallet = require('./Wallet')
const Transaction = require('./Transaction')

module.exports = {
	...User,
	...Valute,
	...ValuteCategories,
	...ValuteForm,
	...Wallet,
	...Transaction,
}
