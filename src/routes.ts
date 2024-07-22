import express, { Request, Response } from 'express'
const router = express.Router()

router
  .get('/', function async(req: Request, res: Response, next) {
    res.status(200).render('index', { title: 'Express' })
  })

  .get('/hello', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
  })

  .get('/message/:name', (req: Request, res: Response) => {
    return res.json({ message: `Hello ${req.params.name}` })
  })

  .get('/healthz', (req: Request, res: Response) => {
    return res.json({ ok: true })
  })

export default router
