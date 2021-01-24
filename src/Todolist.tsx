import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {/*отрендерим li-шки на основе объектов с помощью метода массива map*/}
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}