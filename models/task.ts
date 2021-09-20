/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose'
import { TaskInterface } from '../types'

const taskSchema = new mongoose.Schema<TaskInterface>({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    schedule: [
        {
            day: { type: String },
            fullDay: { type: Boolean },
            subtasks: [{
                start: String,
                end: String,
                _id : false 
            }],
            _id : false 
        }
    ],
    people: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    taskTime: {
        type: Number,
        required: true
    }
  })

  taskSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


export default mongoose.model<TaskInterface>('Task', taskSchema)