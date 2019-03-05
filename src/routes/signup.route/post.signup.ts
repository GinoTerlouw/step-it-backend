import {createUser, findUserByEmail} from '../../services/user.service'
import * as jwt from 'jsonwebtoken'

/**
 * controller for signing up users
 *
 * @param {request} req
 * @param {response} res
 */
const postSignup = async (req, res) => {
  const {email, name, password} = req.body

  if (!email || !password || !name) {
    return res.status(400).json({status: 400, message: 'email, name of password is null'})
  }

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return res.status(400).json({status: 400, message: 'email is al in gebruik'})
  }

  const {id} = await createUser(email, name, password)

  const token = jwt.sign({id, name}, process.env.JWT_SECRET)

  return res.status(200).json({status: 200, result: {token}})
}

export {
  postSignup
}
