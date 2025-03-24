class Bot {
	bot = null;
	accoutId = null;

	constructor(bot, adminId) {
		this.bot = bot;
		this.accoutId = adminId;
	}

	transactionStatusToText(status) {
		switch (status) {
			case 0:
				return "Новая";
			case 1:
				return "Выполнена";
			case 2:
				return "В процессе выплаты";
			case 3:
				return "Что-то пошло не так";
			case 4:
				return "Закрыта";
			default:
				return "Ошибка";
		}
	}

	sendTransaction(t) {
		let course = t.give.course * 1.05;
		let summGiveCount = t.give.count * course;
		let summGetCount = summGiveCount / t.get.course;

		const message = `
DB id ${t.id}
Заявка №${t.order_id}
Статус: ${this.transactionStatusToText(t.status)}

Обмен:

  ${t.give.name} ${t.give.count} ${t.give.key}
  - Курс ${t.give.course} RUB
  ${t.wallet.map((item) => `- ${item.name}: ${item.text}`).join("\n")}

на

  ${t.get.name} ${summGetCount} ${t.get.key}
  - Курс ${t.get.course} RUB
  ${t.get.forms.map((item) => `- ${item.title}: ${item.text}`).join("\n")}

  `;

		this.bot.sendMessage(this.accoutId, message);
	}

	sendMessage(message) {
		this.bot.sendMessage(this.accoutId, message);
	}
}

module.exports = Bot;
