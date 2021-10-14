import React from "react";
import "./App.css"
import { AppBar, Button,Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../API/todolists-api";
import {TodolistsList} from "../features/Todolist/TodolistsList";
import {ErrorSnackbar} from "../Components/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusTypes} from "../state/appReducer";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}
type PropsType = {
    demo? : boolean
}

export function AppWithRedux({demo = false}: PropsType) {
    console.log("App is called")
    let status = useSelector<AppRootStateType,RequestStatusTypes>(state => state.app.status)
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
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <ErrorSnackbar/>
                <TodolistsList demo={demo}/>
            </Container>

        </div>
    )
}



