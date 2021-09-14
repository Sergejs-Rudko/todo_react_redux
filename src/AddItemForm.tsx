import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("")
    const onNewInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setTitle(title)
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("title is required")
            setTitle("")
        }
    }
    const onAddEnterButtonPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            let task = e.currentTarget.value.trim()
            if (task) {
                props.addItem(e.currentTarget.value)
                setTitle("")
            } else {
                setError("title is required")
                setTitle("")
            }
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       label={"Type here"}
                       onChange={onNewInputChangeHandler}
                       onKeyPress={onAddEnterButtonPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}