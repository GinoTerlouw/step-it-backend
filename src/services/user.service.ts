import models from '../models'

interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const findUserByEmail = async (email: string): Promise<User> => {
  return await models.User.findOne({
    where: {
      email: email
    }
  })
}

const createUser = async (email: string, name: string, password: string): Promise<User> => {
  return await models.User.create({
    email,
    password,
    name
  })
}

export {
  findUserByEmail,
  createUser
}
