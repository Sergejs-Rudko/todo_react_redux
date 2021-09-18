import {TaskStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, todolistID1, todolistID2} from "./todolistReducer";


export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID,
    taskID
}) as const

export const addTaskAC = (todolistID: string, taskTitle: string) => ({
    type: "ADD-TASK",
    todolistID,
    taskTitle
}) as const

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    todolistID,
    taskID,
    isDone
}) as const

export const changeTaskTitleAC = (todolistID: string, taskID: string, newTaskTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistID,
    taskID,
    newTaskTitle
}) as const

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export type unionActionType_TASK_REDUCER = RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistType | RemoveTodolistType

const initialState : TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: unionActionType_TASK_REDUCER): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            let filteredTasks = tasks.filter(task => task.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK" : {
            let stateCopy = {...state}
            let newTask: TaskType = {id: v1(), taskTitle: action.taskTitle, isDone: false}
            let tasks = stateCopy[action.todolistID]
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS" : {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            let task = tasks.find(task => task.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            stateCopy[action.todolistID] = tasks
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            let task = tasks.find(task => task.id === action.taskID)
            if(task){
                task.taskTitle = action.newTaskTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let stateCopy = {...state}
            stateCopy[action.todolistID] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default : {
            return state
        }
    }
}