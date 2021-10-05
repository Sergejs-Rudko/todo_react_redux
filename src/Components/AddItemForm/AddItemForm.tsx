import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("Add item form  is called")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("")

    const onNewInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let title = e.currentTarget.value
        setTitle(title)
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("title is required")
        }
    }
    const onAddEnterButtonPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === "Enter") {
            if (title.trim() !== "") {
                props.addItem(title)
            } else {
                setError("title is required")
            }
            setTitle("")
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
})