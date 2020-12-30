import express from 'express'
import botsController from './bots/bots.controller.js'
import cors from 'cors'

const app = express()

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())
app.use('/bots', botsController)

app.listen(4000, console.log("Server online!"))
