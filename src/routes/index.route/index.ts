import Route from '../../router'

import getIndex from './get.index'
import authMiddleware from '../../middlewares/auth.middleware'

const getIndexRoute = new Route({
  controller: getIndex,
  middleware: [authMiddleware],
  method: 'get',
  slug: '/'
})

export {
  getIndexRoute
}
