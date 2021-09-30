import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"
import {TaskComponent} from "./TaskComponent";
import {TaskStatuses, TaskType} from "./API/todolists-api";
import {FilterValueTypes} from "./state/todolistReducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/taskReducer";

//TYPES START
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValueTypes, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    filter: FilterValueTypes
    todolistID: string
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

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch()
    console.log("Todolist is called")

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolistID))
    },[])

    //CLICK HANDLERS START
    //const onDeleteButtonClickHandler = (taskID: string) => props.removeTask(taskID)
    const onFilterAllButtonClick = useCallback(() => props.changeFilter("all", props.todolistID), [props.changeFilter, props.todolistID])
    const onFilterActiveButtonClick = useCallback(() => props.changeFilter("active", props.todolistID), [props.changeFilter, props.todolistID])
    const onFilterCompletedButtonClick = useCallback(() => props.changeFilter("completed", props.todolistID), [props.changeFilter, props.todolistID])

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask, props.todolistID])

    const changeTodolistTitle = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolistID)
    }, [props.changeTodolistTitle, props.todolistID])

    let tasksForTodolist = props.tasks
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onTitleChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(task => <TaskComponent key={task.id}
                                                                todolistID={props.todolistID}
                                                                changeTaskStatus={props.changeTaskStatus}
                                                                onChangeTaskTitleHandler={props.onChangeTaskTitleHandler}
                                                                removeTask={props.removeTask}
                                                                task={task}/>
                    )
                }
            </div>
            <div>
                <Button onClick={onFilterAllButtonClick} variant={props.filter === "all" ? "contained" : "text"}>All
                </Button>
                <Button onClick={onFilterActiveButtonClick}
                        variant={props.filter === "active" ? "contained" : "text"}>Active
                </Button>
                <Button onClick={onFilterCompletedButtonClick}
                        variant={props.filter === "completed" ? "contained" : "text"}>Complete
                </Button>
            </div>
        </div>
    )
})



