const TelegramBot = require("node-telegram-bot-api");
const BotController = require("./bot");
const { transactions } = require("../services");

const adminID = process.env.TELEGRAM_ADMIN_ID;
const token = process.env.TELEGRAM_BOT;

const bot = new TelegramBot(token, { polling: true });
const controller = new BotController(bot, adminID);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1];

	bot.sendMessage(chatId, resp);
});

// Matches "/transaction [order_id]"
bot.onText(/\/transaction (.+)/, async (msg, match) => {
	const chatId = msg.chat.id;
	const order_id = match[1];

	if (chatId !== adminID) return null;

  const { result: t } = await transactions.get({ order_id })

  controller.sendTransaction(t)
});

global.telegram = {
	bot,
	controller,
};
