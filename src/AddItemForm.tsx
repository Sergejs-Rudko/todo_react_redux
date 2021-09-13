import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={title}
                   onChange={onNewInputChangeHandler}
                   onKeyPress={onAddEnterButtonPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}