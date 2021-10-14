import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatus, changeTodolistEntityStatusTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistReducer
} from "./todolistReducer";
import {TodolistType} from "../API/todolists-api";

test("correct todolist should be removed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
    ]

    let action = removeTodolistAC(todolistID1)

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test("New todolist should be added correctly", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
    ]

    let fakeTodolist = {id: todolistID2, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"}
    let action = addTodolistAC(fakeTodolist)

    let endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("TEST")
    expect(endState[2].filter).toBe("all")
})

test("Todolist title should be changed correctly", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
    ]

    let action = changeTodolistTitleAC("HAHA", todolistID1)

    let endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe("HAHA")
    expect(endState[1].title).toBe("What to buy")

})

test("Todolist filter changing to be correct", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 1 , entityStatus : "idle"},
    ]

    let action = changeTodolistFilterAC("active", todolistID1)

    let endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe("all")
})

test("Todolists should be settled ", () => {
    let action = setTodolistsAC([{id: "todolistID1", title: "What to learn", addedDate: "", order: 1},
        {id: "todolistID2", title: "What to buy", addedDate: "", order: 2}
    ])
    let endState = todolistReducer([], action)

    expect(endState.length).toBe(2)
})

test("Todolists entity status should be changed" , () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const startState: Array<TodolistDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus : "idle"},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 1 , entityStatus : "idle"},
    ]

    let action = changeTodolistEntityStatus(todolistID1,"loading")
    let endState = todolistReducer(startState, action)

    expect(endState[0].entityStatus).toBe("loading")
})