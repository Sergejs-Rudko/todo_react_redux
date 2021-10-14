import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../Components/editableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskComponent} from "../Task/TaskComponent";
import {TaskStatuses, TaskType} from "../../API/todolists-api";
import {FilterValueTypes, TodolistDomainType} from "../../state/todolistReducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../state/taskReducer";

//TYPES START
type PropsType = {
    todolist : TodolistDomainType
    demo? : boolean
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValueTypes, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    onChangeTaskTitleHandler: (newValue: string, taskID: string, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

/*export type TaskType = {  DELETE LATER
    id: string
    status : TaskStatuses
    taskTitle: string
}*/

//TYPES END

export const Todolist = React.memo(function ({demo = false,...props}: PropsType) {
    const dispatch = useDispatch()
    console.log("Todolist is called")


    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [dispatch])

    //CLICK HANDLERS START
    //const onDeleteButtonClickHandler = (taskID: string) => props.removeTask(taskID)
    const onFilterAllButtonClick = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onFilterActiveButtonClick = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onFilterCompletedButtonClick = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title,props.todolist.id)
    }, [props.addTask,props.todolist.id])

    const changeTodolistTitle = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolist.id)
    }, [props.changeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onTitleChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                   <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(task => <TaskComponent key={task.id}
                                                                todolistID={props.todolist.id}
                                                                changeTaskStatus={props.changeTaskStatus}
                                                                onChangeTaskTitleHandler={props.onChangeTaskTitleHandler}
                                                                removeTask={props.removeTask}
                                                                task={task}/>
                    )
                }
            </div>
            <div>
                <Button onClick={onFilterAllButtonClick} variant={props.todolist.filter === "all" ? "contained" : "text"}>All
                </Button>
                <Button onClick={onFilterActiveButtonClick}
                        variant={props.todolist.filter === "active" ? "contained" : "text"}>Active
                </Button>
                <Button onClick={onFilterCompletedButtonClick}
                        variant={props.todolist.filter === "completed" ? "contained" : "text"}>Complete
                </Button>
            </div>
        </div>
    )
})



