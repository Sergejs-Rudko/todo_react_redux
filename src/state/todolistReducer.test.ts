import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolistReducer";

test("correct todolist should be removed", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState : Array<TodolistType> = [
        {id : todolistID1, title : "What to learn",filter : "all"},
        {id : todolistID2, title : "What to buy",filter : "all"},
    ]

    let action = RemoveTodolistAC(todolistID1)

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test("New todolist should be added correctly", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState : Array<TodolistType> = [
        {id : todolistID1, title : "What to learn",filter : "all"},
        {id : todolistID2, title : "What to buy",filter : "all"},
    ]

    let action = AddTodolistAC("TEST")

    let endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("TEST")
    expect(endState[2].filter).toBe("all")
})

test("Todolist title should be changed correctly", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState : Array<TodolistType> = [
        {id : todolistID1, title : "What to learn",filter : "all"},
        {id : todolistID2, title : "What to buy",filter : "all"},
    ]

    let action = ChangeTodolistTitleAC("HAHA", todolistID1)

    let endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe("HAHA")
    expect(endState[1].title).toBe("What to buy")

})

test("Todolist filter changing to be correct", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState : Array<TodolistType> = [
        {id : todolistID1, title : "What to learn",filter : "all"},
        {id : todolistID2, title : "What to buy",filter : "all"},
    ]

    let action = ChangeTodolistFilterAC("active",todolistID1)

    let endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe("active")
    expect(endState[1].filter).toBe("all")
})