const TelegramBot = require('node-telegram-bot-api');

const adminID = process.env.TELEGRAM_ADMIN_ID
const token = process.env.TELEGRAM_BOT
const bot = new TelegramBot(token, {polling: true});



// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  console.log(chatId)

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

