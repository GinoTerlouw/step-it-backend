/**
 * controller for get index1
 *
 * @param {request} req
 * @param {response} res
 */
const getIndex = async (req, res) => {
  return res.json({status: 200, result: {user: req.user}})
}

export default getIndex
