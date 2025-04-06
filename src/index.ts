import 'dotenv/config'
import App from './app'

const port: number = parseInt(process.env.PORT || '3000', 10)
const server = new App({ port: port })

server.app.listen(port, () => {
  console.log(`  🚀 Server ready at: http://localhost:${port}
  ⚡️ See sample requests: https://github.com/rodrigo-work/express-amplify?tab=readme-ov-file#express-amplify`)
})
