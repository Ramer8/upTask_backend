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

#### Create a cluster in Atlas Mongo DB

If you have one, just create a new database.

Remebers your credentials to connect to your cluster.

`mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/`

#### Atlas mongo DB

Connect to your cluster to host your Data Base

<img src="/public/atlaswebpageconnection.png/"/>
 
 Choose Compass to access at your data

<img src="/public/atlaswebpageconnection1.png/"/>

Copy your connection string and go to Compass.
If you need install Compass app in your desktop or just open it.

<img src="/public/atlaswebpageconnection2.png/"/>

Compass

<img src="/public/compassconnection.png"/>

Paste your connection string

`mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/`

Save it and choose any color to recognize it.

### Mongoose

MongoDB ODM

ORM is Object Relational Mapping, ODM it the same but the "D" (Document) is because the info stored in collections in MongoDB
We use Mongoose ODM method to CRUD actions
(Others ORM, Prisma, Sequelize, etc.)

Install mongoose

`npm i mongoose`

Install dotenv

`npm i dotenv`

Create .env file with database credentials

`
DATABASE_URL=mongodb+srv://<user>:<password>@cluster0.fmaxf9e.mongodb.net/

`

Create config folder and db.ts file to connecto to mongoDB data base.

```

import mongoose from "mongoose"
import color from "colors"
import { exit } from "node:process"

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL)
    console.log(connection)
  } catch (error) {
    console.log(error.message)
    exit(1)
  }
}


```
