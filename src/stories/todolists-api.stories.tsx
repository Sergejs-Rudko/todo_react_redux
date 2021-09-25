import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../API/todolists-api";

export default {
    title: "API"
}


export const GetTodolists = () => {
    let [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    let [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("TODOLIST FOR TESTING")
            .then((response) => {
                setState(response.data.messages)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const RemoveTodolist = () => {
    let [state, setState] = useState<any>(null)

    useEffect(() => {
        let todolistID = "413bc4f1-59a2-431b-ac77-bf0afce105ea"
        todolistsAPI.removeTodolist(todolistID)
            .then((response) => {
                setState(response.data.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    let [state, setState] = useState<any>(null)

    useEffect(() => {
        let todolistId = "0040e716-e589-46b9-906b-a33e11f86a7b"
        todolistsAPI.updateTodolist(todolistId, "Still playing")
            .then((response) => {
                setState(response.data.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    let [state, setState] = useState<any>(null)
    const todolistID = "0040e716-e589-46b9-906b-a33e11f86a7b"
    useEffect(() => {
        todolistsAPI.getTasks(todolistID).then((response) => {
            setState(response.data.items)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    let [state, setState] = useState<any>(null)
    const todolistID = "9792d1f6-5bf0-4a28-8d58-2a2a919d8435"
    const taskID = ""
    useEffect(() => {
        todolistsAPI.deleteTask(todolistID, taskID).then((response) => {
            setState(response.data)
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    let [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTask("0040e716-e589-46b9-906b-a33e11f86a7b", "NEW TASK ADDED")
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    let [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistID = "0040e716-e589-46b9-906b-a33e11f86a7b"
        let taskID = "f1809517-751d-4125-b176-e5be49aaf2be"
        todolistsAPI.updateTask(todolistID, taskID, "MY FIRST TITLE EDITED")
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}