import {FilterValueTypes, TodolistType} from "../App";
import {v1} from "uuid";

export let removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    id: todolistID
}) as const

export let addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    title: title,
    todolistID : v1()
}) as const

export let changeTodolistTitleAC = (newTitle: string, todolistID: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistID,
    newTitle
}) as const

export let changeTodolistFilterAC = (newFilterValue: FilterValueTypes, todolistID: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilterValue,
    todolistID
}) as const

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>

export type unionActionType_TODOLIST_REDUCER = RemoveTodolistType |
    AddTodolistType |
    ChangeTodolistTitleType |
    ChangeTodolistFilterType

export const todolistReducer = (state: Array<TodolistType>, action: unionActionType_TODOLIST_REDUCER) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let copy = [...state]
            copy = copy.filter(tl => tl.id !== action.id)
            return copy
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.todolistID, title: action.title, filter: "all"}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let copy = [...state]
            let todolist = copy.find(tl => tl.id === action.todolistID)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [...copy]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let copy = [...state]
            let todolist = copy.find(tl => tl.id === action.todolistID)
            if (todolist) {
                todolist.filter = action.newFilterValue
            }
            return [...copy]
        }
        default :
            throw new Error("I dont understand")
    }
}