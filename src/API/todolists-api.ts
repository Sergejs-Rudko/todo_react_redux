import axios from "axios";

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TodoTaskPriorities {
    Low,
    Middle,
    High,
    Urgent,
    Later,
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "a22bfbba-37b1-4c5b-a966-b83499c73071"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}


export type UpdateTaskType = {
    addedDate: string//"2021-09-25T09:34:17.1878986Z"
    deadline: string | null
    description: string | null
    id: string//"41749e59-7b72-48b8-9dfa-a7e807156f51"
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string //"9792d1f6-5bf0-4a28-8d58-2a2a919d8435"
}


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    removeTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    createTask(todolistID: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, {title: taskTitle})
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    }
    //41749e59-7b72-48b8-9dfa-a7e807156f51
}