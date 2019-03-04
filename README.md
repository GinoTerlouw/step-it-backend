# Amstapper
Backend created in nodejs in combination with typescript.

## Requirements
- node js 10.x
- npm

## Npm scripts
- run watch: runs the app and recompiles on code changes (for dev)
- run build: compiles the app (output can be found under dist)
- start: runs the prebuilt app (from dist)

## Snippets
 
 - Create a new route

First off all create a new controller under src controllers, name the file as 
the function name and make sure to export it.

```
const getDinges = (req, res) => {
  return res.json({status: "ok! :D"})
}

export default getDinges;
```

To expose the route on the server add the following snippets in src/app.ts
```
this.registerRoute({
    slug: '/dinges',
    method: 'get',
    middleware: [],
    controller: getDinges
})
```

Don't forget to import the controller like this ;)
```
import index from './controllers/getDinges'

```