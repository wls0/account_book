const Users = require('../../models/user')

const IdFind = async (id) => {
  const user = await Users.findOne({ where: { id } })
  if (user) {
    return true
  } else {
    return false
  }
}

const UserCreate = async (data) => {
  try {
    const { id, password, salt } = data
    await Users.create({
      id,
      password,
      salt
    })
    return true
  } catch (E) {
    return false
  }
}

module.exports = { IdFind, UserCreate }
