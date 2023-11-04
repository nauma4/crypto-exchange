require("dotenv").config();

const express = require("express");
const mongoose = require("./mongodb");
const adminBot = require("./admin_bot");
const { server } = require("./rest");
const { auth, valutes, transactions } = require("./services");
const daemon = require("./coinapi");

global.PUBLIC_PATH = "http://localhost:8080";

function main() {
	server.use("/public", express.static("public"));
	const router = express.Router();
	//
	// AUTHORIZATION
	//
	router.post("/login", async (req, res) => {
		const result = await auth.login(req.body);
		res.json(result);
	});
	router.post("/register", async (req, res) => {
		const result = await auth.register(req.body);
		res.json(result);
	});

	//
	// VALUTES
	//
	router.get("/valutes", async (req, res) => {
		const result = await valutes.valutes();
		res.json(result);
	});
	router.get("/valutes/:id", async (req, res) => {
		const result = await valutes.valute(req.params.id, req.query.type);
		res.json(result);
	});
	router.get("/reserve", async (req, res) => {
		const result = await valutes.reserve();
		res.json(result);
	});

	//
	// TRANSACTIONS
	//
	router.get("/transactions/:id", async (req, res) => {
		const result = await transactions.get({ id: req.params.id });
		res.json(result);
	});
	router.put("/transactions", async (req, res) => {
		const result = await transactions.add(req.body);
		res.json(result);
	});

	//
	// PROFILE
	//
	router.get("/profile", async (req, res) => {
		const result = await auth.getProfile({ token: req.headers.token });
		res.json(result);
	});
	router.post("/profile", async (req, res) => {
		const result = await auth.editProfile({ token: req.headers.token, ...req.body });
		res.json(result);
	});
	router.post("/profile/password", async (req, res) => {
		const result = await auth.editPassword({ token: req.headers.token, ...req.body });
		res.json(result);
	});

	//
	server.use("/api", router);

	// const valute = new mongoose.Valute({
	// 	name: "Bitcoin",
	// 	key: "BTC",
	// 	is_give: true,
	// 	is_get: false,
	// 	image: "/public/bitcoin.png",
	// 	min_give: 0.0028,
	// 	max_get: 2,
	// 	course: 1,
	// });

	// valute.saveValid()

	// console.log(valute)

	// const eth = new mongoose.Wallet({
	//   valute_id: '6539ae573c401c3ff22ebbe7',
	//   name: 'Main Bitcoin',
	//   balance: 10,
	//   data: [
	//     { name: 'Адресс', text: 'bc1q4knmjmnh2mwty3rnzj0mky44dpsvjlvfpy6jxr' }
	//   ]
	// })
	// eth.saveValid()

	// const form = new mongoose.ValuteForm({
	// 	valute_id: '6539ae573c401c3ff22ebbe7',
	// 	type: "get",
	// 	title: "Адрес кошелька",
	// 	name: "address",
	// 	// regexp: '',
	// 	// length: 16,
	// 	max_length: 34,
	// 	required: true,
	// });
	// form.saveValid()

	daemon();
}

module.exports = main;
