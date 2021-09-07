import React from "react";
import {FilterValueTypes} from "./App";
//TYPES START
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValueTypes) => void
}

export type TaskType = {
    id: number
    isDone: boolean
    taskTitle: string
}

//TYPES END

export function Todolist(props: PropsType) {

    //CLICK HANDLERS START
    const onDeleteButtonClickHandler = (taskID: number) => props.removeTask(taskID)
    const onFilterAllButtonClick = () => props.changeFilter("all")
    const onFilterActiveButtonClick = () => props.changeFilter("active")
    const onFilterCompletedButtonClick = () => props.changeFilter("completed")
    //CLICK HANDLERS END

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id}><input type={"checkbox"} checked={task.isDone}/><span>{task.taskTitle}</span>
                        <button onClick={() => onDeleteButtonClickHandler(task.id)}>x</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => onFilterAllButtonClick()}>All</button>
                <button onClick={() => onFilterActiveButtonClick()}>Active</button>
                <button onClick={() => onFilterCompletedButtonClick()}>Complete</button>
            </div>
        </div>
    )
}