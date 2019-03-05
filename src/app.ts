import * as express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'
import Route from './router'
import * as bodyParser from 'body-parser'
import models from './models'

class App {
  private app: express = express()
  private readonly port: number

  constructor() {
    dotenv.config()
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000
    this.applyGlobalMiddleware()
    this.registerRoutes(routes)
    this.startServer()

    // run this to sync models with the database
    // models.sequelize.sync({force: true})
  }

  /**
   *
   * applies middleware that will run on every request
   */
  private applyGlobalMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
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
