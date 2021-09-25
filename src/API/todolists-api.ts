import axios from "axios";

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
    id: number
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
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

type CreateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item : TaskType
    }
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

type UpdateTaskResponseType = {

}



export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    removeTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}` )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistID : string, taskID : string){
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    createTask(todolistID : string, taskTitle : string){
        return instance.post<CreateTaskResponseType>(`todo-lists/${todolistID}/tasks`,{title : taskTitle})
    },
    updateTask(todolistID : string, taskID : string, newTitle : string){
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistID}/tasks/${taskID}`, {
            addedDate: "2021-09-25T10:02:26.467",
            deadline: null,
            description:  null,
            id: taskID,
            order: -1,
            priority: 1,
            startDate:  null,
            status: 0,
            title: newTitle,
            todoListId: todolistID //"9792d1f6-5bf0-4a28-8d58-2a2a919d8435"
        })
    }
    //41749e59-7b72-48b8-9dfa-a7e807156f51
}