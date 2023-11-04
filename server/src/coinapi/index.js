const axios = require("axios");

const mongoose = require("../mongodb");

function getToken(id) {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: "https://api.coingecko.com/api/v3/coins/" + id,
		headers: {
			Accept: "application/json",
		},
	};

	return axios(config)
		.then((response) => response.data)
		.catch((error) => {
			console.log(error);
		});
}

const coins = {
  ethereum: async () => {
    const request = await getToken('ethereum')
    const course = request.market_data.current_price.rub

    const valute = await mongoose.Valute.findOne({ key: 'ETH' })
    valute.course = course
    valute.save()
  },

  tether: async () => {
    const request = await getToken('tether')
    const course = request.market_data.current_price.rub

    const valutes = await mongoose.Valute.find({ key: 'USDT' })
    for(let i = 0; i < valutes.length; i++) {
      let valute = valutes[i]

      valute.course = course
      valute.save()
    }
  },

  dash: async () => {
    const request = await getToken('dash')
    const course = request.market_data.current_price.rub

    const valute = await mongoose.Valute.findOne({ key: 'DASH' })
    valute.course = course
    valute.save()
  },

  // monero: async () => {
  //   const request = await getToken('monero')
  //   const course = request.market_data.current_price.rub

  //   const valute = await mongoose.Valute.findOne({ key: 'XMR' })
  //   valute.course = course
  //   valute.save()
  // },

  bitcoin: async () => {
    const request = await getToken('bitcoin')
    const course = request.market_data.current_price.rub

    const valute = await mongoose.Valute.findOne({ key: 'BTC' })
    valute.course = course
    valute.save()
  },
}

function pause (timer) {
  return new Promise((resolve) => {
    setTimeout(resolve, timer)
  })
}

function call () {
  Object.keys(coins).map(async key => {
    coins[key]()
    await pause(1000 * 30)
  })
}

module.exports = function main() {
  call()
  const daemon = setInterval(call, 1000 * 60 * 10)

	function stop() {
    clearInterval(daemon)
	}

	process.on("SIGINT", stop);
	process.on("SIGTERM", stop);
	process.on("SIGQUIT", stop);
};
