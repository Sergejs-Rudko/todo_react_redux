import React, {useReducer, useState} from "react";
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    const dispatch = useDispatch()

    //STATES START

    let tasks = useSelector<AppRootStateType,TaskStateType>(state => state.tasks)
    let todolists = useSelector<AppRootStateType,Array<TodolistType>>( (state)=> state.todolists)
    //STATES END

    //FUNCTIONS START
    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(todolistID, taskID)
        dispatch(action)
    }

    function addTask(taskTitle: string, todolistID: string) {
        let action = addTaskAC(todolistID, taskTitle)
        dispatch(action)
    }

    function changeFilter(filterValue: FilterValueTypes, todolistID: string) {
        let action = changeTodolistFilterAC(filterValue, todolistID)
        dispatch(action)

    }

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        let action = changeTaskStatusAC(todolistID, taskID, isDone)
        dispatch(action)
    }

    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    function onChangeTaskTitleHandler(newTitle: string, todolistID: string, taskID: string) {
        let action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
    }

    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let action = changeTodolistTitleAC(newTitle, todolistID)
        dispatch(action)
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
                            let tasksForTodolist = tasks[todolist.id]
                            if (todolist.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
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



