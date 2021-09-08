/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { PersonInterface } from '../types'

const personSchema = new mongoose.Schema<PersonInterface>({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
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
    tasks: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
        }
    ],
    daysOff: [String],
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