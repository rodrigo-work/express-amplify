require('dotenv').config()
import App from './app'

const port: number = parseInt(process.env.PORT || '3000', 10)
const server = new App({ port: port })

server.app.listen(port, function () {
  console.info(`🚀 Application listening on the http://localhost:${port}`)
})
