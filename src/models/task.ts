import mongoose from 'mongoose'
import { TaskInterface } from '../types'

const taskSchema = new mongoose.Schema<TaskInterface>({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    schedule: {
        sunday: {
            type: [Number]
        },
        monday: {
            type: [Number]
        },
        tuesday: {
            type: [Number]
        },
        wednesday: {
            type: [Number]
        },
        thursday: {
            type: [Number]
        },
        friday: {
            type: [Number]
        },
        saturday: {
            type: [Number]
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