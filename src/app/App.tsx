import React, {useState} from "react";
import "./App.css"
import {Todolist} from "../features/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../API/todolists-api";
import {FilterValueTypes, TodolistDomainType} from "../state/todolistReducer";


/*export type TodolistType = { DELETE LATER
    id: string
    title: string
    filter: FilterValueTypes
}*/

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    //STATES START
    let [tasksObj, setTasks] = useState<TaskStateType>({
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
                title: "CSS",
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

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ])
    //STATES END

    //FUNCTIONS START
    function removeTask(taskID: string, todolistID: string) {
        let filteredTasks = tasksObj[todolistID].filter(task => task.id !== taskID)
        tasksObj[todolistID] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(taskTitle: string, todolistID: string) {
        let newTask: TaskType = {
            description: "string",
            title: taskTitle,
            status: TaskStatuses.New,
            priority: TodoTaskPriorities.Low,
            startDate: "",
            deadline: "",
            id: v1(),
            todoListId: todolistID,
            order: 1,
            addedDate: ""
        }
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

    function changeTaskStatus(taskID: string, status: TaskStatuses, todolistID: string) {
        let task = tasksObj[todolistID].find(task => task.id === taskID)
        if (task) {
            task.status = status
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
        let todolist: TodolistDomainType = {id: v1(), title: title, filter: "all", addedDate: "", order: 1}
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    function onChangeTaskTitleHandler(newTitle: string, todolistID: string, taskID: string) {
        let task = tasksObj[todolistID].find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
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



