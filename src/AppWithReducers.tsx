import React, {useReducer} from "react";
import "./App.css"
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/taskReducer";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "./API/todolists-api";

export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    //STATES START
    let [tasksObj, dispatchToTasksReducer] = useReducer(taskReducer, {
        [todolistID1]: [
            {
                description: "string",
                title: "CSS",
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todolistID1,
                order: 1,
                addedDate: ""
            }
        ],
        [todolistID2]: [
            {
                description: "string",
                title: "HTML",
                status: TaskStatuses.Completed,
                priority: TodoTaskPriorities.Low,
                startDate: "",
                deadline: "",
                id: v1(),
                todoListId: todolistID2,
                order: 2,
                addedDate: ""
            }
        ]
    })

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate : "", order : 1},
        {id: todolistID2, title: "What to buy", filter: "all",addedDate : "", order : 2}
    ])
    //STATES END

    //FUNCTIONS START
    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(todolistID, taskID)
        dispatchToTasksReducer(action)
    }

    function addTask(taskTitle: string, todolistID: string) {
        let action = addTaskAC(todolistID, taskTitle)
        dispatchToTasksReducer(action)
    }

    function changeFilter(filterValue: FilterValueTypes, todolistID: string) {
        let action = changeTodolistFilterAC(filterValue, todolistID)
        dispatchToTodolistsReducer(action)

    }

    function changeTaskStatus(taskID: string, status : TaskStatuses, todolistID: string) {
        let action = changeTaskStatusAC(todolistID, taskID, status)
        dispatchToTasksReducer(action)
    }

    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function onChangeTaskTitleHandler(newTitle: string, todolistID: string, taskID: string) {
        let action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatchToTasksReducer(action)
    }

    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let action = changeTodolistTitleAC(newTitle, todolistID)
        dispatchToTodolistsReducer(action)
    }

    //FUNCTIONS END


    return (
        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TODOLISTS
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={(title: string) => {
                        addTodolist(title)
                    }}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) => {
                            let tasksForTodolist = tasksObj[todolist.id]
                            if (todolist.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New)
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={2} style={{padding: "10px", marginTop: "10px"}}>
                                        <Todolist
                                            key={todolist.id}
                                            todolistID={todolist.id}
                                            title={todolist.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={todolist.filter}
                                            removeTodolist={removeTodolist}
                                            onChangeTaskTitleHandler={onChangeTaskTitleHandler}
                                            changeTodolistTitle={changeTodolistTitle}/>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}



