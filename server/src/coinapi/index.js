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
    if (!request?.market_data) return null;
    const course = request?.market_data?.current_price?.rub

    const valute = await mongoose.Valute.findOne({ key: 'ETH' })
    if (!valute) return null
    valute.course = course
    valute.save()
  },

  tether: async () => {
    const request = await getToken('tether')
    if (!request?.market_data) return null;
    const course = request?.market_data?.current_price?.rub

    const valutes = await mongoose.Valute.find({ key: 'USDT' })
    if (!valutes) return null

    for(let i = 0; i < valutes.length; i++) {
      let valute = valutes[i]

      valute.course = course
      valute.save()
    }
  },

  dash: async () => {
    const request = await getToken('dash')
    if (!request?.market_data) return null;
    const course = request?.market_data?.current_price?.rub

    const valute = await mongoose.Valute.findOne({ key: 'DASH' })
    if (!valute) return null
    valute.course = course
    valute.save()
  },

  monero: async () => {
    const request = await getToken('monero')
    if (!request?.market_data) return null;
    const course = request?.market_data?.current_price?.rub

    const valute = await mongoose.Valute.findOne({ key: 'XMR' })
    valute.course = course
    valute.save()
  },

  bitcoin: async () => {
    const request = await getToken('bitcoin')
    if (!request?.market_data) return null;
    const course = request?.market_data?.current_price?.rub

    const valute = await mongoose.Valute.findOne({ key: 'BTC' })
    if (!valute) return null
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
  try {
    Object.keys(coins).map(async key => {
      coins[key]()
      await pause(1000 * 55)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = function main() {
  pause(1000 * 60 * 5)
  call()
  const daemon = setInterval(call, 1000 * 60 * 10)

	function stop() {
    clearInterval(daemon)
	}

	process.on("SIGINT", stop);
	process.on("SIGTERM", stop);
	process.on("SIGQUIT", stop);
};
