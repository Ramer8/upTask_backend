import server from "./server"
import colors from "colors"

const port = process.env.PORT || 6000
// cambie el puerto a 8000 porque el 6000 daba problemas de cors
server.listen(port, () => {
  console.log(colors.cyan.italic.bold(`Rest API working at port ${port}`))
})
