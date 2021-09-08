/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express'
import { ObjectId } from 'mongoose';
// import taskService from '../services/taskService'
import Person from '../models/person'
import Task from '../models/task'

const router = express.Router();

router.get('/', [], async (_req: Request, res: Response ) => {
  const people = await Person
    .find({})
    .populate('tasks', ({id: 1, name: 1, time: 1 }))

  return res.status(200).json(people);

});

router.post('/', [], async (req: Request, res: Response) => {
    const person = new Person(req.body)
  
    const savedPerson = await person.save()
  
    savedPerson.tasks.forEach( async ( taskId : ObjectId ) => {
      const task = await Task.findById(taskId)
      if (task) {
        task.people = task.people.concat(savedPerson._id)
        await task.save()
      }
    })
    return res.status(201).json(savedPerson)
})

export default router;