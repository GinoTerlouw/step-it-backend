import * as express from 'express'
import * as dotenv from 'dotenv'
import index from './controllers/index'

interface Route {
  slug: string,
  method: string,
  middleware?: Array<Function>,
  controller: Function
}

class App {
  private app: express = express()
  private readonly port: number

  constructor() {
    dotenv.config()
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000
    this.registerRoutes()
    this.startServer()
  }

  /**
   * exposes route on server
   * @param {Route} opts
   */
  private registerRoute(opts: Route): void {
    const {slug, method, middleware, controller} = opts

    this.app[method](slug, middleware, controller)
  }

  /**
   *
   * registers all routes
   */
  private registerRoutes(): void {
    this.registerRoute({
      slug: '/',
      method: 'get',
      middleware: [],
      controller: index
    })
  }

  /**
   *
   * starts server on pre-specified port
   */
  startServer(): void {
    this.app.listen(this.port, (err) => {
      if (err) throw err

      console.log(`Server listening on port ${this.port}`)
    })
  }
}

export default new App()