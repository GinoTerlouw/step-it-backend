import * as express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'
import Route from './router'

class App {
  private app: express = express()
  private readonly port: number

  constructor() {
    dotenv.config()
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000
    this.registerRoutes(routes)
    this.startServer()
  }

  /**
   *
   * exposes routes on the server
   * @param {Array<Route>} routes
   */
  private registerRoutes(routes: Array<Route>): void {
    routes.forEach((route: Route) => {
      const {slug, method, middleware, controller} = route

      this.app[method](slug, middleware, controller)
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
