import React, {useState} from "react";
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueTypes = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    //STATES START
    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), isDone: true, taskTitle: "HTML + CSS"},
            {id: v1(), isDone: true, taskTitle: "JS"},
            {id: v1(), isDone: false, taskTitle: "React"}
        ],
        [todolistID2]: [
            {id: v1(), isDone: true, taskTitle: "Book"},
            {id: v1(), isDone: false, taskTitle: "Pen"},
        ]
    })

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])
    //STATES END

    //FUNCTIONS START
    function removeTask(taskID: string, todolistID: string) {
        let filteredTasks = tasksObj[todolistID].filter(task => task.id !== taskID)
        tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(taskTitle: string, todolistID: string) {
        let newTask: TaskType = {id: v1(), isDone: false, taskTitle: taskTitle}
        let tasks = tasksObj[todolistID]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistID] = newTasks
        setTasks({...tasksObj})
    }

    function changeFilter(filterValue: FilterValueTypes, todolistID: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistID)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        let task = tasksObj[todolistID].find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function removeTodolist(todolistID: string) {
        let filteredTodolists = todolists.filter(todolist => todolist.id !== todolistID)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistID]
        setTasks({...tasksObj})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    function onChangeTaskTitleHandler(newTitle: string, todolistID: string, taskID: string) {
        let task = tasksObj[todolistID].find(t => t.id === taskID)
        if (task) {
            task.taskTitle = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
                            }
                            if (todolist.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={2} style={{padding : "10px", marginTop : "10px"}}>
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



