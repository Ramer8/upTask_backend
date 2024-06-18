## UpTask Backend

---

### Kick Start

#### Commands:

`npm init --y `

create package.json

`npm i express`

Install Express

npm i -D @types/express

Install Nodemon to restar server on changes

`npm i -D nodemon`

Nodemon to use with typescript

`npm i ts-node`

Install typescript

`npm i typescript`

Create folder SRC and index.ts & server.ts inside

Create file tsconfig.json with this data.

```

{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "lib": [
      "esnext"
    ],
    "target": "ESNext",
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "strict": false,
    "sourceMap": true,
    "esModuleInterop": true,
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

```

In server.ts

```
import express from "express"

const app = express()

export default app

```

In index.ts connect to server

```
import server from "./server"

const port = process.env.Port || 6000

server.listen(port, () => {
  console.log(`Rest API working at port ${port}`)
})


```

In package.json write this lines to run server

```
 "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts "
  },

```

Install colors to best experience on backend

`npm i colors`
