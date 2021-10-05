import {TaskStateType} from "../app/App";

import {AddTodolistType, RemoveTodolistType, SetTodolistsActionType} from "./todolistReducer";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../API/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

// ACTIONS
export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE-TASK",
    todolistID,
    taskID,
}) as const

export const addTaskAC = (task: TaskType) => ({
    type: "ADD-TASK",
    task,
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

//THUNKS
export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch<unionActionType_TASK_REDUCER>) => {
        todolistsAPI.getTasks(todolistID)
            .then((response) => {
                dispatch(setTasksAC(todolistID, response.data.items))
            })
    }
}
export const removeTaskTC = (todolistID: string, taskID: string) => {
    return (dispatch: Dispatch<unionActionType_TASK_REDUCER>) => {
        todolistsAPI.deleteTask(todolistID, taskID).then(() => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
    }
}
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<unionActionType_TASK_REDUCER>) => {
        todolistsAPI.createTask(todolistID, title).then(
            (response) => {
                dispatch(addTaskAC(response.data.data.item))
            }
        )
    }
}
export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) => {
    return (dispatch: Dispatch<unionActionType_TASK_REDUCER>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            console.warn("Imposssssibrree O_o")
            return
        }
        const model: UpdateTaskModelType = {
            title: title,
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            description: task.description
        }
        todolistsAPI.updateTask(todolistID, taskID, model).then(
            () => {
                dispatch(changeTaskTitleAC(todolistID, taskID, title))
            }
        )
    }
}
export const changeTaskStatusTC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return (dispatch: Dispatch<unionActionType_TASK_REDUCER>, getState: () => AppRootStateType) => {
        const state = getState();
        let task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            console.warn("Task not found wtf O_o")
            return
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            status: status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistsAPI.updateTask(todolistID, taskID, model).then(
            () => {
                dispatch(changeTaskStatusAC(todolistID, taskID, status))
            }
        )
    }
}

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: unionActionType_TASK_REDUCER): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            /*            let stateCopy = {...state}
                        let tasks = stateCopy[action.todolistID]
                        let filteredTasks = tasks.filter(task => task.id !== action.taskID)
                        stateCopy[action.todolistID] = filteredTasks
                        return stateCopy*/
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case "ADD-TASK" : {
            /*            let stateCopy = {...state}
                        let newTask = action.task
                        let tasks = stateCopy[newTask.todoListId]
                        let newTasks = [newTask, ...tasks]
                        stateCopy[newTask.todoListId] = newTasks
                        return stateCopy*/
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS" : {
            /*            let tasks = state[action.todolistID]
                        state[action.todolistID] = tasks.map(task => task.id === action.taskID ? {
                            ...task,
                            status: action.status
                        } : task)

                        return {...state}*/
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    status: action.status
                } : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            /*            let tasks = state[action.todolistID]
                        state[action.todolistID] = tasks.map(task => task.id === action.taskID ? {
                            ...task,
                            title: action.newTaskTitle
                        } : task)
                        return {...state}*/

            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.newTaskTitle
                } : task)
            }
        }
        case "ADD-TODOLIST": {
            /*            let stateCopy = {...state}
                        stateCopy[action.todolist.id] = []
                        return stateCopy*/
            return {...state, [action.todolist.id]: []}
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
            /*            const stateCopy = {...state}
                        stateCopy[action.todolistID] = action.tasks
                        return stateCopy*/
            return {...state, [action.todolistID]: action.tasks}
        }
        default : {
            return state
        }
    }
}

// TYPES
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