import * as express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes'
import Route from './router'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import models from './models'

class App {
  private app: express = express()
  private readonly port: number
  private readonly router: express.Router = express.Router()

  constructor() {
    dotenv.config()
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000
    this.applyGlobalMiddleware()
    this.registerRoutes(routes)
    this.checkIfDBConnectionIsAlive().catch((e) => {
      console.log(e)
    })

    // run this to sync models with the database
    // models.sequelize.sync({force: true})
  }

  /**
   *
   * applies middleware that will run on every request
   */
  private applyGlobalMiddleware(): void {
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(bodyParser.json())
  }

  /**
   *
   * checks whether or not sequelize is connected to the database,
   * if so it starts the server.
   */
  private async checkIfDBConnectionIsAlive(): Promise<void> {
    try {
      await models.sequelize.authenticate()

      this.startServer()
    } catch (e) {
      console.log(e)
      throw 'connection could not be established'
    }
  }

  /**
   *
   * exposes routes on the server
   * @param {Array<Route>} routes
   */
  private registerRoutes(routes: Array<Route>): void {
    routes.forEach((route: Route) => {
      const {slug, method, middleware, controller} = route

      this.router[method](slug, middleware, controller)
    })

    this.app.use(`/api/V${process.env.API_VER}`, this.router)
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
