import express from 'express'
import { UserController } from './controller/UserController'
import { config } from 'dotenv'
import cors from 'cors'

config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/historic', UserController.getStoric)
app.post('/historic', UserController.changeLocation)

app.listen(process.env.PORT || 1777, () => {
    console.log(`Calibrator Control running in ${process.env.PORT || 1777} port`)
})