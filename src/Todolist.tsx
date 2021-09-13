import React, {ChangeEvent} from "react";
import {FilterValueTypes} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
//TYPES START
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValueTypes, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    filter: FilterValueTypes
    todolistID: string
    removeTodolist: (todolistID: string) => void
    onChangeTaskTitleHandler: (newValue: string, taskID: string, todolistID: string) => void
    changeTodolistTitle: (newTitle: string,todolistID : string) => void
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

//TYPES END

export function Todolist(props: PropsType) {

    //CLICK HANDLERS START
    //const onDeleteButtonClickHandler = (taskID: string) => props.removeTask(taskID)
    const onFilterAllButtonClick = () => props.changeFilter("all", props.todolistID)
    const onFilterActiveButtonClick = () => props.changeFilter("active", props.todolistID)
    const onFilterCompletedButtonClick = () => props.changeFilter("completed", props.todolistID)

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const changeTodolistTitle = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolistID)
    }

    //CLICK HANDLERS END
    return (
        <div>
            <h3><EditableSpan title={props.title} onTitleChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>Del todolist</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task) => {
                        //CLICKHANDLER for each task
                        const onRemoveButtonClickHandler = () => props.removeTask(task.id, props.todolistID)
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
                        }
                        const onChangeTitleHandler = (newTitleValue: string) => {
                            props.onChangeTaskTitleHandler(newTitleValue, props.todolistID, task.id)
                        }
                        //CLICKHANDLERS END
                        return <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input type={"checkbox"}
                                   checked={task.isDone}
                                   onChange={onTaskStatusChangeHandler}/>
                            <EditableSpan title={task.taskTitle} onTitleChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveButtonClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onFilterAllButtonClick} className={props.filter === "all" ? "active-filter" : ""}>All
                </button>
                <button onClick={onFilterActiveButtonClick}
                        className={props.filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onFilterCompletedButtonClick}
                        className={props.filter === "completed" ? "active-filter" : ""}>Complete
                </button>
            </div>
        </div>
    )
}



