import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    FilterValueTypes,
    removeTodolistTC,
    TodolistDomainType
} from "../../state/todolistReducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../../state/taskReducer";
import {TaskStatuses} from "../../API/todolists-api";
import {Grid, Paper} from "@mui/material/";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {TaskStateType} from "../../app/AppWithRedux";


type TodolistsListPropsType = {
    demo? : boolean
}
export const TodolistsList  : React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const dispatch = useDispatch()

    //STATES START

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
    //STATES END

    //FUNCTIONS START
    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTodolistTC())
    }, [dispatch])


    const removeTask = useCallback((taskID: string, todolistID: string) => {
        dispatch(removeTaskTC(todolistID, taskID))
    }, [dispatch])


    const addTask = useCallback((taskTitle: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, taskTitle))
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValueTypes, todolistID: string) => {
        let action = changeTodolistFilterAC(filterValue, todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        dispatch(changeTaskStatusTC(todolistID, taskID, status))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const onChangeTaskTitleHandler = useCallback((newTitle: string, todolistID: string, taskID: string) => {
        dispatch(changeTaskTitleTC(todolistID, taskID, newTitle))
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [dispatch])
    return (
        <>
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
                                        demo={demo}
                                        todolist = {todolist}
                                        key={todolist.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        onChangeTaskTitleHandler={onChangeTaskTitleHandler}
                                        changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}