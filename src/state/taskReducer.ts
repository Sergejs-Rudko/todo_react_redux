import {TaskStateType} from "../App";

import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, SetTodolistsActionType} from "./todolistReducer";
import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities} from "../API/todolists-api";
import {Dispatch} from "redux";


export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID,
    taskID,
}) as const

export const addTaskAC = (todolistID: string, taskTitle: string) => ({
    type: "ADD-TASK",
    todolistID,
    taskTitle,
}) as const

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => ({
    type: "CHANGE-TASK-STATUS",
    todolistID,
    taskID,
    status,
}) as const

export const changeTaskTitleAC = (todolistID: string, taskID: string, newTaskTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistID,
    taskID,
    newTaskTitle,
}) as const

export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => ({
    type: "SET-TASKS",
    todolistID,
    tasks
}) as const


export const fetchTasksTC = (todolisID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolisID)
            .then((response) => {
                dispatch(setTasksAC(todolisID, response.data.items))
            })
    }
}


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

export type unionActionType_TASK_REDUCER =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistType |
    RemoveTodolistType |
    SetTodolistsActionType |
    SetTasksActionType

const initialState: TaskStateType = {}

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
            let newTask: TaskType = {
                id: v1(),
                title: action.taskTitle,
                status: TaskStatuses.New,
                addedDate: "",
                deadline: "",
                order: 1,
                startDate: "",
                description: "",
                priority: TodoTaskPriorities.Low,
                todoListId: action.todolistID
            }
            let tasks = stateCopy[action.todolistID]
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS" : {
            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(task => task.id === action.taskID ? {
                ...task,
                status: action.status
            } : task)

            return {...state} /// продолжить
        }
        case "CHANGE-TASK-TITLE": {

            let tasks = state[action.todolistID]
            state[action.todolistID] = tasks.map(task => task.id === action.taskID ? {
                ...task,
                title: action.newTaskTitle
            } : task)
            return {...state}
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
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = action.tasks
            return stateCopy
        }
        default : {
            return state
        }
    }
}