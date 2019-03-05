import Route from '../../router'

import getIndex from './get.index'

const getIndexRoute = new Route({
  controller: getIndex,
  middleware: [],
  method: 'get',
  slug: '/'
})

export {
  getIndexRoute
}
