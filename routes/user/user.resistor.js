const Users = require('../../models/user')
const { PasswordCoder } = require('../../lib')
const IdFind = async (id) => {
  const user = await Users.findOne({ where: { userId: id } })
  if (user) {
    return true
  } else {
    return false
  }
}

const UserCreate = async (data) => {
  try {
    const { userId, pwd } = data
    const { password, salt } = await PasswordCoder(pwd)
    await Users.create({
      userId,
      password,
      salt
    })
    return true
  } catch (E) {
    return false
  }
}

module.exports = { IdFind, UserCreate }
