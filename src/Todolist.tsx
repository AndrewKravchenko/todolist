import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void

}

export function Todolist(props: TodolistType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {/*отрендерим li-шки на основе объектов с помощью метода массива map*/}
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=> {props.removeTask(t.id)}}>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {props.changeFilter("all")}}>All</button>
            <button onClick={() => {props.changeFilter("active")}}>Active</button>
            <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}