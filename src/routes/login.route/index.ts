import Route from '../../router'

import {postLogin} from './post.login'

const postLoginRoute = new Route({
  slug: '/login',
  method: 'post',
  middleware: [],
  controller: postLogin
})

export {
  postLoginRoute
}
