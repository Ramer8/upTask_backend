import server from "./server"

const port = process.env.Port || 6000

server.listen(port, () => {
  console.log(`Rest API working at port ${port}`)
})
