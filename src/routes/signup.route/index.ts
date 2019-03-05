import Route from '../../router'

import {postSignup} from './post.signup'

const postSignupRoute = new Route({
  slug: '/signup',
  method: 'post',
  middleware: [],
  controller: postSignup
})

export {
  postSignupRoute
}
