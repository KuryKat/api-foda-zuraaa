import { getAll, getById, getTop } from './bots.service.js'
import express from 'express'

const router = express.Router()

router.use((req, _, next) => {
  console.log('Request: ' + '(' + req.method + ') ' + req.originalUrl)
  next()
})

router.get('/', (req, res) => {
  const { type } = req.query
  if (type === 'top') {
    res.send(getTop(6))
  } else if (type === 'all') {
    res.send(getAll())
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(getById(id))
})

export default router
