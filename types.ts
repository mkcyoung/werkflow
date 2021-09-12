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

export interface PersonHours {
    start: string;
    end: string;
}

export type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export interface Day {
    // date: Date;
    day: WeekDay;
    time: PersonHours;
    taskHours: number;
}

// export interface PersonSchedule {
//     sunday: Day;
//     monday: Day;
//     tuesday: Day;
//     wednesday: Day;
//     thursday: Day;
//     friday: Day;
//     saturday: Day;
// }

export interface Name {
    first: string;
    last: string
}

export interface DayOff {
    date: string,
    allDay: boolean,
    timeIn?: PersonHours
}

export interface PersonInterface {
    name: Name;
    schedule: Day[];
    tasks: ObjectId[];
    daysOff?: DayOff[];
}


