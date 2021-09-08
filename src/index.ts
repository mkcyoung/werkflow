import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server = http.createServer(app)

const port : unknown = config.PORT

server.listen(port, () => {
    logger.info(`Server running on port ${port}`)
})


// import express from 'express';
// import cors from 'cors';

// import taskRouter from './routes/tasks'
// // import patientRouter from './routes/patients';

// const app = express();
// app.use(express.json());
// // eslint-disable-next-line @typescript-eslint/no-unsafe-call
// app.use(cors());

// const PORT = 3001;

// app.get('/api/ping', (_req, res) => {
//   res.send('pong');
// });

// app.use('/api/tasks', taskRouter);
// // app.use('/api/patients', patientRouter);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });