import * as jwt from 'jsonwebtoken'
import {findUserByEmail} from '../services/user.service'

/**
 * populates req.user if user is authenticated
 *
 * @param req
 * @param res
 * @param next
 */
const authMiddleware = async (req, res, next) => {
  const {authorization} = req.headers

  if (!authorization) {
    return res.status(400).json({status: 400, message: 'No authorization header provided'})
  }

  const token = authorization.split('JWT ')[1]

  if (!token) {
    return res.status(400).json({status: 400, message: 'Malformed jwt provided'})
  }

  try {
    const {email} = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await findUserByEmail(email)

    next()
  } catch (err) {
    return res.status(400).json({status: 400, message: 'Invalid jwt token'})
  }
}

export default authMiddleware
