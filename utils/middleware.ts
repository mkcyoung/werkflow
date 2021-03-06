/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import logger from './logger'

const requestLogger = (request: any, _response: any, next: any) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: any, response: any) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

// Error handling etc.
const errorHandler = (error: any, _request: any, response: any, next: any) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'invalid token'
    })
    }   
    next(error)
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}