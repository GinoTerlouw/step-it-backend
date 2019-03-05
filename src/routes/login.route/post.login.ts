import {createUser, findUserByEmail, isPasswordCorrect} from '../../services/user.service'
import * as jwt from 'jsonwebtoken'

/**
 * controller for logging in users
 *
 * @param {request} req
 * @param {response} res
 */
const postLogin = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    return res.status(400).json({status: 400, message: 'email of password is null'})
  }

  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(400).json({status: 400, message: 'er is geen gebruiker gevonden'})
  }

  const passwordCorrect = await isPasswordCorrect(password, user.password);

  if (!passwordCorrect) {
    return res.status(400).json({status: 400, message: 'password is verkeerd'})
  }

  const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET)

  return res.status(200).json({status: 200, result: {token}})
}

export {
  postLogin
}
