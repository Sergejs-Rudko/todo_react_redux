import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskStatuses, TaskType} from "./API/todolists-api";

type TaskPropsType = {
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status : TaskStatuses, todolistID: string) => void
    onChangeTaskTitleHandler: (newValue: string, taskID: string, todolistID: string) => void
    task: TaskType
    todolistID: string
}
export const TaskComponent = React.memo((props: TaskPropsType) => {

    const onRemoveButtonClickHandler = () => props.removeTask(props.task.id, props.todolistID)

    const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
    }
    const onChangeTitleHandler = useCallback((newTitleValue: string) => {
        props.onChangeTaskTitleHandler(newTitleValue, props.todolistID, props.task.id)
    }, [props.onChangeTaskTitleHandler, props.todolistID, props.task.id])

    //CLICKHANDLERS END
    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "isDone" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onTaskStatusChangeHandler}/>
        <EditableSpan title={props.task.title} onTitleChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveButtonClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>

})