import * as bodyParser from 'body-parser'
import express from 'express'
import path from 'node:path'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'

import routes from './routes'

export default class App {
  public app: express.Application
  public port: number

  constructor(appInit: { port: number }) {
    this.app = express()
    this.port = appInit.port

    this.init()
    this.engine()
    this.assets()

    // this.middlewares()
    this.routes()
    this.ErrorHandler()
  }

  private init() {
    this.app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))
    this.app.use(compression())

    this.app
      .use(bodyParser.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use(cors())
      .use(morgan('dev'))
    this.app.use(cookieParser())
    this.app.use(express.text())
    this.app.disable('x-powered-by')
  }

  private engine() {
    this.app.set('views', path.join(__dirname, 'views'))
    this.app.set('view engine', 'twig')
  }

  private assets() {
    this.app.use(express.static(path.join(__dirname, '../public')))
  }

  // private middlewares() {
  //   this.app.use()
  // }

  private routes() {
    this.app.use(routes)
  }

  private ErrorHandler() {
    // catch 404 and forward to error handler
    this.app

      .use(function (req, res, next) {
        next(createError(404))
      })

      // error handler
      .use(function (err: any, req: any, res: any, next: any) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.render('error')
      })
  }
}
