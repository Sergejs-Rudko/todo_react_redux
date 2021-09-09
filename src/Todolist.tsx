import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueTypes} from "./App";
//TYPES START
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueTypes) => void
    addTask: (taskTitle: string) => void
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

//TYPES END

export function Todolist(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    //CLICK HANDLERS START
    //const onDeleteButtonClickHandler = (taskID: string) => props.removeTask(taskID)
    const onFilterAllButtonClick = () => props.changeFilter("all")
    const onFilterActiveButtonClick = () => props.changeFilter("active")
    const onFilterCompletedButtonClick = () => props.changeFilter("completed")
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onNewTaskInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setNewTaskTitle(title)
    }
    const onAddTaskEnterButtonPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        //CLICKHANDLER for each task
                        const onRemoveButtonClickHandler = () => props.removeTask(task.id)
                        return <li key={task.id}><input type={"checkbox"}
                                                        checked={task.isDone}/><span>{task.taskTitle}</span>
                            <button onClick={onRemoveButtonClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onFilterAllButtonClick}>All</button>
                <button onClick={onFilterActiveButtonClick}>Active</button>
                <button onClick={onFilterCompletedButtonClick}>Complete</button>
            </div>
        </div>
    )
}