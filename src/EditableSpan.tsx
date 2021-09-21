import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onTitleChange: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EDITABLE SPAN CALLED")
    //STATES START
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")
    //STATES END


    //FUNCTIONS START
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onTitleChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let text = e.currentTarget.value
        setTitle(text)
    }
    //FUNCTIONS END

    return (
        editMode
            ? <TextField value={title}
                     onBlur={activateViewMode}
                     autoFocus={true}
                     onChange={onChangeTitleHandler}></TextField>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})