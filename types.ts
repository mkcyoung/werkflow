import { ObjectId } from 'mongoose';


export interface Schedule {
    sunday: string[];
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
}

export interface TaskInterface {
    name: string;
    category: string;
    schedule: Schedule;
    people: ObjectId[];
    time: number
}

export interface PersonInterface {
    firstName: string;
    lastName: string;
    schedule: Schedule;
    tasks: ObjectId[];
    daysOff: string[];
}