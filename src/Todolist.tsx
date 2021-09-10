import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueTypes} from "./App";
//TYPES START
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueTypes) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus : (taskID : string, isDone : boolean) => void
    filter : FilterValueTypes
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

//TYPES END

export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>("")

    //CLICK HANDLERS START
    //const onDeleteButtonClickHandler = (taskID: string) => props.removeTask(taskID)
    const onFilterAllButtonClick = () => props.changeFilter("all")
    const onFilterActiveButtonClick = () => props.changeFilter("active")
    const onFilterCompletedButtonClick = () => props.changeFilter("completed")
    const addTask = () => {
        if(newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        }else{
            setError("title is required")
        }
    }
    const onNewTaskInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setNewTaskTitle(title)
    }
    const onAddTaskEnterButtonPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            props.addTask(e.currentTarget.value)
            setNewTaskTitle("")
        }
    }


    //CLICK HANDLERS END

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTaskInputChangeHandler}
                       onKeyPress={onAddTaskEnterButtonPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        //CLICKHANDLER for each task
                        const onRemoveButtonClickHandler = () => props.removeTask(task.id)
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id,e.currentTarget.checked)
                        }
                        //CLICKHANDLERS END
                        return <li key={task.id} className={task.isDone ? "isDone" : ""}><input type={"checkbox"}
                                                        checked={task.isDone}
                        onChange={onTaskStatusChangeHandler}/><span>{task.taskTitle}</span>
                            <button onClick={onRemoveButtonClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onFilterAllButtonClick} className={props.filter === "all" ? "active-filter" : ""}>All</button>
                <button onClick={onFilterActiveButtonClick} className={props.filter === "active" ? "active-filter" : ""}>Active</button>
                <button onClick={onFilterCompletedButtonClick} className={props.filter === "completed" ? "active-filter" : ""}>Complete</button>
            </div>
        </div>
    )
}