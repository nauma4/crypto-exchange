var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
	smtpTransport({
		service: "mail",
		host: "smtp.mail.ru",
    port: 465,
		auth: {
			user: process.env.GOOGLE_EMAIL,
			pass: process.env.GOOGLE_PASSWORD,
		},
	})
);

var mailOptions = {
	to: "romka.nauma@gmail.com",
	from: process.env.GOOGLE_EMAIL,
	subject: "Sending Email using Node.js[nodemailer]",
	text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
