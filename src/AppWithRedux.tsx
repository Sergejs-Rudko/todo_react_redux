import React, {useCallback, useEffect} from "react";
import "./App.css"
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistTC, FilterValueTypes,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,

} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./API/todolists-api";

/*export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}
}*/
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    console.log("App is called")
    const dispatch = useDispatch()

    //STATES START

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
    //STATES END

    //FUNCTIONS START
    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])


    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskAC(todolistID, taskID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistID: string) => {
        let action = addTaskAC(todolistID, taskTitle)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValueTypes, todolistID: string) => {
        let action = changeTodolistFilterAC(filterValue, todolistID)
        dispatch(action)

    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        let action = changeTaskStatusAC(todolistID, taskID, status)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const onChangeTaskTitleHandler = useCallback((newTitle: string, todolistID: string, taskID: string) => {
        let action = changeTaskTitleAC(todolistID, taskID, newTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        let action = changeTodolistTitleAC(newTitle, todolistID)
        dispatch(action)
    }, [dispatch])

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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todolist) => {
                            let tasksForTodolist = tasks[todolist.id]


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



