import React, {useState} from "react";
import "./App.css"
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = "all" | "active" | "completed"

export function App() {
    // another todolist for later
    /*    let tasks2: Array<TaskType> = [
            {id: 1, isDone: true, taskTitle: "Book"},
            {id: 2, isDone: false, taskTitle: "Pen"},
        ]*/
    //STATES START
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), isDone: true, taskTitle: "HTML + CSS"},
        {id: v1(), isDone: true, taskTitle: "JS"},
        {id: v1(), isDone: false, taskTitle: "React"}
    ])

    let [filter, setFilter] = useState<FilterValueTypes>("all")
    //STATES END

    //FUNCTIONS START
    function removeTask(taskID: string) {
        let filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(taskTitle: string) {
        let newTask: TaskType = {id: v1(), isDone: false, taskTitle: taskTitle}
        setTasks([newTask, ...tasks])
    }

    function changeFilter(filterValue: FilterValueTypes) {
        setFilter(filterValue)
    }

    function changeTaskStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([ ...tasks])
    }

    //FUNCTIONS END


    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    return (
        <div className={"App"}>
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            filter={filter}/>
        </div>
    )
}

