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
    return res.status(400).json({status: 400, message: 'no authorization header provided'})
  }

  try {
    const {email} = await jwt.verify(authorization, process.env.JWT_SECRET)

    const {id, createdAt, updatedAt} = await findUserByEmail(email)

    req.user = {id, email, createdAt, updatedAt}

    next()
  } catch (err) {
    return res.status(400).json({status: 400, message: 'invalid jwt token'})
  }
}

export default authMiddleware
