import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan");

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
        return editMode
        ? <TextField  value={title} onChange={onChangeTitleHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})