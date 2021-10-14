import {TaskStateType} from "../app/AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, taskReducer} from "./taskReducer";
import { setTodolistsAC} from "./todolistReducer";
import {TaskStatuses} from "../API/todolists-api";

test("taskReducer // correct task should be deleted from correct array ", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },


        ],
        "todolistID2": [
            {
                id: "1",
                title: "Bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "2",
                title: "Milk",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "3",
                title: "Chocolate",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "4",
                title: "Cheese",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
        ]
    }
    const action = removeTaskAC("todolistID1", "1")
    let endState = taskReducer(startState, action)

    expect(endState["todolistID1"][0].id).toBe("2")
})

/*test("taskReducer // item should be added to correct array", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },


        ],
        "todolistID2": [
            {
                id: "1",
                title: "Bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "2",
                title: "Milk",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "3",
                title: "Chocolate",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "4",
                title: "Cheese",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
        ]
    }

    let action = addTaskAC("todolistID1", "HTML")

    let endState = taskReducer(startState, action)

    expect(endState["todolistID1"][0].title).toBe("HTML")
    expect(endState["todolistID1"][0].status).toBe(TaskStatuses.New)
    expect(endState["todolistID1"].length).toBe(4)
    expect(endState["todolistID2"].length).toBe(4)
})*/

test("taskReducer // task should change it's status correctly", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "2",
                title: "HTML",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },


        ],
        "todolistID2": [
            {
                id: "1",
                title: "Bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "2",
                title: "Milk",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "3",
                title: "Chocolate",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "4",
                title: "Cheese",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
        ]
    }

    let action = changeTaskStatusAC("todolistID2", "3", TaskStatuses.Completed)
    let endState = taskReducer(startState, action)

    expect(endState["todolistID2"][2].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistID1"][2].status).toBe(TaskStatuses.New)
})

test("taskReducer // task should change it's title correctly", () => {
    const startState: TaskStateType = {
        "todolistID1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID1"
            },


        ],
        "todolistID2": [
            {
                id: "1",
                title: "Bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "2",
                title: "Milk",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "3",
                title: "Chocolate",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
            {
                id: "4",
                title: "Cheese",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },
        ]
    }

    let action = changeTaskTitleAC("todolistID2", "2", "Banana")
    let endState = taskReducer(startState, action)

    expect(endState["todolistID2"][1].title).toBe("Banana")
    expect(endState["todolistID1"][1].title).toBe("JS")
})




test("empty arrays should be added when todolists are settled", () => {
    let action = setTodolistsAC([
        {id: "1", title: "First todolist", order: 1, addedDate: ""},
        {id: "2", title: "Second todolist", order: 2, addedDate: ""},
    ])

    let endState = taskReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
})

test("correct array of task should belong to exact todolistID", () => {
    const startState: TaskStateType = {
        "todolistID1": [],
        "todolistID2": [
            {
                id: "1",
                title: "Bread",
                status: TaskStatuses.New,
                addedDate: "",
                order: 1,
                startDate: "",
                description: "",
                deadline: "",
                priority: 1,
                todoListId: "todolistID2"
            },

        ]
    }
    let action = setTasksAC("todolistID1", [
        {
            id: "1",
            title: "CSS",
            status: TaskStatuses.New,
            addedDate: "",
            order: 1,
            startDate: "",
            description: "",
            deadline: "",
            priority: 1,
            todoListId: "todolistID1"
        },
    ])

    let endState = taskReducer(startState, action)

    expect(endState["todolistID1"][0].title).toBe("CSS")

})


