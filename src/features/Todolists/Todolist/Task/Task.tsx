import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {RequestStatusType} from '../../../../app/app-reducer'

export type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {

    const {task, changeTaskStatus, changeTaskTitle, removeTask, todolistId} = props

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [removeTask, task.id, todolistId])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [changeTaskStatus, task.id, todolistId])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistId)
    }, [changeTaskTitle, task.id, todolistId])

    return <div key={task.id}
                className={task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
        <Checkbox color="primary"
                  onChange={onChangeStatusHandler}
                  checked={task.status === TaskStatuses.Completed}
        />
        <EditableSpan title={task.title}
                      onChange={onChangeTitleHandler}
                      disabled={props.entityStatus === 'loading'}
        />
        <IconButton onClick={onClickHandler} disabled={props.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
})



