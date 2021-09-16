import {FilterValueTypes, TodolistType} from "../App";
import {v1} from "uuid";

export let RemoveTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    id: todolistID
}) as const

export let AddTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    title: title
}) as const

export let ChangeTodolistTitleAC = (newTitle: string, todolistID: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistID,
    newTitle
}) as const

export let ChangeTodolistFilterAC = (newFilterValue: FilterValueTypes, todolistID: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilterValue,
    todolistID
}) as const

export type RemoveTodolistType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>

export type unionActionType = RemoveTodolistType |
    AddTodolistType |
    ChangeTodolistTitleType |
    ChangeTodolistFilterType

export const todolistReducer = (state: Array<TodolistType>, action: unionActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let copy = [...state]
            copy = copy.filter(tl => tl.id !== action.id)
            return copy
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: v1(), title: action.title, filter: "all"}
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