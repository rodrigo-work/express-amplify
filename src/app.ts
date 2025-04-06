import path from 'node:path'
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import createError from 'http-errors'

import { CognitoService } from './AppService'

const cognitoService = new CognitoService()

class App {
  public app: express.Application
  public port: number

  constructor(appInit: { port: number }) {
    this.app = express()
    this.port = appInit.port

    this.init()
    this.Routes()
    this.ErrorHandler()
  }

  private init() {
    this.app
      .disable('x-powered-by')
      .use(bodyParser.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use(express.static(path.join(__dirname, '../public')))
  }

  private Routes() {
    this.app

      .get('/', (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
      })

      .get('/health', async (req: Request, res: Response) => {
        try {
          const result = await cognitoService.CheckHealth()
          res.status(201).json(result)
        } catch (error) {
          res.status(500).json({ message: error instanceof Error ? error.message : String(error) })
        }
      })

      .post('/message', async (req: Request, res: Response) => {
        const { name } = req.body

        if (!name) {
          return res.status(400).json({ message: 'Username e password são obrigatórios.' })
        }

        try {
          const result = await cognitoService.Message(name)
          res.status(201).json(result)
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      })
  }

  private ErrorHandler() {
    this.app
      .use(function (req: Request, res: Response, next: NextFunction) {
        next(createError(404))
      })

      .use(function (err: any, req: Request, res: Response, next: NextFunction) {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        res.status(err.status || 500)
        res.json({
          status: err.status,
          message: err.message
        })
      })
  }
}

export default App
