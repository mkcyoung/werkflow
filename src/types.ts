import { ObjectId } from 'mongoose';


export interface Schedule {
    sunday: number[];
    monday: number[];
    tuesday: number[];
    wednesday: number[];
    thursday: number[];
    friday: number[];
    saturday: number[];
}

export interface TaskInterface {
    name: string;
    group: string;
    schedule: Schedule;
    people: ObjectId[];
    time: number
}