import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_URL]

    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Error de CORS"))
    }
    // callback(null, true)
    //este callback comentado es para cuando no uso el
    //la condicion de verficar el origen de datos por que es undefined cuando
    // es del mismo ordenador
  },
}
