/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express'
// import taskService from '../services/taskService'
import Person from '../models/person'

const router = express.Router();

router.get('/', [], async (_req: Request, res: Response ) => {
  const people = await Person
    .find({})
    .populate('tasks', ({id: 1, name: 1, time: 1 }))

  return res.status(200).json(people);

});



export default router;