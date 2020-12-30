import express from 'express'
import botsController from './bots/bots.controller.js'

const app = express()

app.use(express.json())
app.use('/bots', botsController)

app.get('/', (req, res) => res.send('Hello world'))

app.listen(4000, console.log("Server online!"))
