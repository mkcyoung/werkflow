/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import taskService from '../services/taskService'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(taskService.getTasks());
});

export default router;