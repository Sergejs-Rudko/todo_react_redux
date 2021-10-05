import React from "react";
import "./App.css"
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import { TaskType} from "../API/todolists-api";
import {TodolistsList} from "../features/Todolist/TodolistsList";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    console.log("App is called")

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
                <TodolistsList/>
            </Container>
        </div>
    )
}



