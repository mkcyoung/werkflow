/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Request, Response } from 'express'
// import { ObjectId } from 'mongoose';
// import taskService from '../services/taskService'
import Task from '../models/task'

const router = express.Router();

router.get('/', [], async (_req: Request, res: Response ) => {
  const tasks = await Task
    .find({})
    .populate('people', ({id: 1, firstName: 1, lastName: 1, schedule: 1, daysOff: 1 }))

  return res.status(200).json(tasks)

});

// router.post('/', [], async (req: Request, res: Response) => {
//   const task = new Task(req.body)

//   task.people.forEach( (person : ObjectId ) => {
    
//   })

//   const savedTask = await task.save()

//   user.blogs = user.blogs.concat(savedBlog._id)
//   await user.save()

//   return res.status(201).json(savedTask)
// })

export default router;