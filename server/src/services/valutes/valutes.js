const database = require('../../mongodb')
const Valute = database.Valute
const Wallet = database.Wallet

module.exports = async function () {
  const data = await Valute.find()

  let valuteList = {
    status: true,
    result: {
      get: [],
      give: []
    }
  }

  let valutes = data.map(valute => {
    return Wallet.find({ valute_id: valute._id })
      .then(wallets => {
        if(valute.is_get) {
          valuteList.result.get.push({
            id: valute._id,
            name: valute.name,
            key: valute.key,
            image: global.PUBLIC_PATH + valute.image,
            min_give: valute.min_give,
            max_get: valute.max_get,
            reserve: wallets.reduce((prev, next) => prev + next.balance, 0),
            course: valute.course,
            percent_get: valute.percent_get,
            percent_give: valute.percent_give,
          })
        }
        if(valute.is_give) {
          valuteList.result.give.push({
            id: valute._id,
            name: valute.name,
            key: valute.key,
            image: global.PUBLIC_PATH + valute.image,
            min_give: valute.min_give,
            max_get: valute.max_get,
            reserve: wallets.reduce((prev, next) => prev + next.balance, 0),
            course: valute.course,
            percent_get: valute.percent_get,
            percent_give: valute.percent_give,
          })
        }
      })
      
		})
    await Promise.all(valutes)

    return valuteList
}
