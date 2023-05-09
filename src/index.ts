import express from 'express'
import { connectDB } from './mongo'
import routerUser from './routers/routerUser'

const app = express()

app.use(express.json())
app.use(routerUser)

const PORT = 3001

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running 🚀 on port ${PORT}`)
  })
}).catch((error) => {
  console.log('Connection to database failed!! ❌', error)
})
