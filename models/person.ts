/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { PersonInterface } from '../types'

const personSchema = new mongoose.Schema<PersonInterface>({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    schedule: {
        sunday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        monday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        tuesday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        wednesday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        thursday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        friday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        },
        saturday: {
            timeIn: {
                start: { type: String, default: '' },
                end: { type: String, default: '' },
            },
            taskHours: { type: Number, default: 0}
        }
    },
    tasks: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
        }
    ],
    daysOff: [
        {
            date: String,
            allDay: Boolean,
            timeIn: {
                start: { type: String },
                end: { type: String },
            }
        }
    ],
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const Person = mongoose.model<PersonInterface>('Person', personSchema)

export default Person