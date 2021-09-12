import { PersonInterface,
    Name, 
    Day, 
    WeekDay,
    PersonHours 
} from "../types"
import { ObjectId } from 'mongoose';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isName = (param : any): param is Name => {
    if (!param.first || !isString(param.first)){
        throw new Error('incorrect or missing first name')
    }
    if (!param.last || !isString(param.last)){
        throw new Error('incorrect or missing last name')
    }
    return true
}

const parseName = ( name : any ) : Name => {
    if (!name || !isName(name)){
        throw new Error('incorrect or missing name')
    }
    return name;
}

const isDay = (day: unknown): day is WeekDay => {
    if (isString(day)){
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        return weekdays.includes(day)
    }
    return false
}

const isHours = (param: any): param is PersonHours => {
    if (!(isString(param.start) || !(isString(param.end)) ) ){
        throw new Error('malformed time')
    }
    return true
}

const isSchedule = (param: any): param is Day[] => {
    if (!Array.isArray(param) || param.length > 7){
        throw new Error('malformed schedule')
    }
    param.forEach((day) => {
        if (!isDay(day.day)){
            throw new Error('weekday entered is not a weekday')
        }
        if (!isHours(day.time)){
            throw new Error('scheduled hours are malformed')
        }
    })
    return true
}

const parseSchedule = (schedule: unknown) : Day[] => {
    if (!schedule || !isSchedule(schedule)) {
        throw new Error('malformed schedule')
    }
    const newSchedule : Day[] = schedule.map((day)=>{
        return {
            ...day,
            taskHours: 0
        }
    })
    return newSchedule
}

const isTask = (param: any): param is ObjectId[] => {
    if (!Array.isArray(param)){
        throw new Error('malformed tasks')
    }
    param.forEach((objID)=>{
        if (!isString(objID)){
            throw new Error('obj id not a valid string')
        }
    })
    return true
}

const parseTasks = (task: unknown): ObjectId[] =>{
    if (!task || !isTask(task)){
        throw new Error('malformed task')
    }
    return task
}

type PersonFields = {  name : unknown, schedule: unknown, tasks: unknown }
export const toNewPerson = ({name, schedule, tasks} : PersonFields ) : PersonInterface => {
    const newPerson : PersonInterface = {
        name: parseName(name),
        schedule: parseSchedule(schedule),
        tasks: parseTasks(tasks),
        daysOff: []
    }
    return newPerson
}

