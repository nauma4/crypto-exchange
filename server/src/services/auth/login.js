const jwt = require('jwt-simple')
const database = require('../../mongodb')
const User = database.User

module.exports = async function (data) {
	if (!data.password || !data.email) {
		return {
			status: false,
			message: 'Не все поля заполнены!'
		}
	}

  try {
    const user = await User.findOne({ email: data.email })
    if(user.validPassword(data.password)) {
  
      const token = jwt.encode({
        type: user.type,
        isAuth: true,
        userId: user._id
      }, process.env.SECRET)
  
     return {
        status: true,
        result: {
          token,
          email: user.email,
        }
      }
    } else {
      return {
        status: false,
        message: 'Неверный email или пароль!'
      }
    }
  } catch (e) {
    return {
      status: false,
      message: 'Неверный email или пароль!'
    }
  }
}
