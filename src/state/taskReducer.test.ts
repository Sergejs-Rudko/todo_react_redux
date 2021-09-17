import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
import {addTodolistAC} from "./todolistReducer";

test("taskReducer // correct task should be deleted from correct array ", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }
    const action = removeTaskAC("todolistID1", "1")
    let endState = taskReducer(startState, action)

    expect(endState["todolistID1"][0].id).toBe("2")
})

test("taskReducer // item should be added to correct array", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }

    let action = addTaskAC("todolistID1","HTML")

    let endState = taskReducer(startState,action)

    expect(endState["todolistID1"][0].taskTitle).toBe("HTML")
    expect(endState["todolistID1"][0].isDone).toBe(false)
    expect(endState["todolistID1"].length).toBe(4)

    expect(endState["todolistID2"].length).toBe(4)
})

test("taskReducer // task should change it's status correctly", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }

    let action = changeTaskStatusAC("todolistID2","3",true)
    let endState = taskReducer(startState,action)

    expect(endState["todolistID2"][2].isDone).toBe(true)
    expect(endState["todolistID1"][2].isDone).toBe(false)
})

test("taskReducer // task should change it's title correctly", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }

    let action = changeTaskTitleAC("todolistID2","2","Banana")
    let endState = taskReducer(startState,action)

    expect(endState["todolistID2"][1].taskTitle).toBe("Banana")
    expect(endState["todolistID1"][1].taskTitle).toBe("JS")
})

test("taskReducer // should add empty array of task fro new todolist", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }

    let action = addTodolistAC("yo")
    let endState = taskReducer(startState,action)


    const keys = Object.keys(endState)
    expect(keys.length).toBe(3)

})


test("taskReducer // tasks should be deleted after todolist is deleted", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {id: "1", taskTitle: "CSS", isDone: true},
            {id: "2", taskTitle: "JS", isDone: false},
            {id: "3", taskTitle: "React", isDone: false},
        ],
        "todolistID2": [
            {id: "1", taskTitle: "Bread", isDone: false},
            {id: "2", taskTitle: "Milk", isDone: false},
            {id: "3", taskTitle: "Chocolate", isDone: false},
            {id: "4", taskTitle: "Cheese", isDone: false},
        ]
    }


})

