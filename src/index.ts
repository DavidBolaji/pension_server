import { server } from './app'
const PORT = 3000

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
