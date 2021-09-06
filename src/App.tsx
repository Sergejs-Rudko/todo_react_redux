import React from "react";
import "./App.css"
import {TaskType, Todolist} from "./Todolist";

export function App() {
    let tasks1: Array<TaskType> = [
        {id: 1, isDone: true, taskTitle: "HTML + CSS"},
        {id: 2, isDone: true, taskTitle: "JS"},
        {id: 3, isDone: false, taskTitle: "React"}
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, isDone: true, taskTitle: "Book"},
        {id: 2, isDone: false, taskTitle: "Pen"},
        {id: 3, isDone: true, taskTitle: "Pencil"}
    ]

    return (
        <div className={"App"}>
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to buy"} tasks={tasks2}/>
        </div>
    )
}

