/* eslint-disable @typescript-eslint/no-unsafe-call */
import config from './utils/config'
import express from 'express'
require('express-async-errors')
import cors from 'cors'
import connect from './utils/connect'
import taskRouter from './routes/tasks'
import middleware from './utils/middleware'
import logger from './utils/logger'
const app = express()

if (config.MONGODB_URI){
    logger.info('connecting to', config.MONGODB_URI)
    connect(config.MONGODB_URI)
}

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())

app.use('/api/tasks', taskRouter)

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


export default app