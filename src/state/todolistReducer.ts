import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../API/todolists-api";
import {Dispatch} from "redux";

export let removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    id: todolistID
}) as const

export let addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    title: title,
    todolistID: v1()
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
    ChangeTodolistFilterType |
    SetTodolistsActionType


export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter : FilterValueTypes
}

export let todolistID1 = v1()
export let todolistID2 = v1()
const initialState: Array<TodolistDomainType> = [
   /* {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to buy", filter: "all"}*/
]

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: unionActionType_TODOLIST_REDUCER) : Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let copy = [...state]
            copy = copy.filter(tl => tl.id !== action.id)
            return copy
        }
        case "ADD-TODOLIST": {
            return [{id : action.todolistID,title : action.title, filter : "all", addedDate : "",order : 0},...state]
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
        case "SET-TODOLISTS": {

            return action.todolists.map(tl => ({...tl,filter : "all" }))
        }
        default :
            return state
    }
}

export let setTodolistsAC = (todolists : Array<TodolistType>) : SetTodolistsActionType => ({
    type : "SET-TODOLISTS",
    todolists : todolists
})

export type SetTodolistsActionType = {
    type : "SET-TODOLISTS",
    todolists : Array<TodolistType>
}

export const fetchTodolistTC = () =>  (dispatch : Dispatch) => {
    todolistsAPI.getTodolists().then((response) => {
        dispatch(setTodolistsAC(response.data))
    })
}