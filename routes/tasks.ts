/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import { ObjectId } from 'mongoose';
// import taskService from '../services/taskService'
import Task from '../models/task'
import Person from '../models/person'

const router = express.Router();

router.get('/', [], async (_req: Request, res: Response ) => {
  const tasks = await Task
    .find({})
    .populate('people', ({id: 1, name: 1, schedule: 1, daysOff: 1, tasks: 1 }))

  return res.status(200).json(tasks)

});

router.post('/', [], async (req: Request, res: Response) => {
  const task = new Task(req.body)

  const savedTask = await task.save()

  savedTask.people.forEach( async ( personId : ObjectId ) => {
    const person = await Person.findById(personId)
    if (person) {
      person.tasks = person.tasks.concat(savedTask._id)
      await person.save()
    }
  })
  return res.status(201).json(savedTask)
})

export default router;