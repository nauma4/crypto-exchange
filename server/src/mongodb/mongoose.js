const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect to database error:'))
db.once('open', function() {
	console.log('Connected to database!')
})

module.exports = require('./models')
