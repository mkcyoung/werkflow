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
    schedule: {
        sunday: {
            // date: Date, // maybe something like this could be useful.
            type: [String]
        },
        monday: {
            type: [String]
        },
        tuesday: {
            type: [String]
        },
        wednesday: {
            type: [String]
        },
        thursday: {
            type: [String]
        },
        friday: {
            type: [String]
        },
        saturday: {
            type: [String]
        }
    },
    people: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    time: {
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