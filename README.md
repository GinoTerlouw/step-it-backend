# Amstapper
Backend created in nodejs in combination with typescript.

## Requirements
- node js 10.x
- npm 6.5.x

## Npm scripts
- run watch: runs the app and recompiles on code changes (for dev)
- run build: compiles the app (output can be found under dist)
- start: runs the prebuilt app (from dist)

## Snippets
 
 - Create a new route

First off create a new folder under routes.
For example:
>  dinges.route

For every method on this route create a typescript file named by their method.
So for get it would be:
> get.dinges.ts


In get.dinges.ts you create your controller like this:
```
const getDinges = (req, res) => {
  return res.json({status: "ok! :D"})
}

export default getDinges;
```

To expose the route on the server we need to add just 2 more things

1. Create an index.ts file and import all of your route methods like this
```
import Route from '../../router'

import getDinges from './get.dinges'
```

after that we will create the Route object, here we will pass in the controller,
middlewares, type of method and the slug and we'll export the routes

```
const getDingesRoute = new Route({
  controller: getDinges,
  middleware: [],
  method: 'get',
  slug: '/'
})

export {
  getIndexRoute
}
```

2. import and export the route in routes/index.ts so that the app registers the routes so
they'll get exposed to the server

```
import {getDingesRoute} from './dinges.route'

export default [
  getDingesRoute
]
```
