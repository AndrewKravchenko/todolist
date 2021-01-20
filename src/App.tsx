import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

// Функция удаления тасок
// Принимает id удаляемой таски
// Возвращает отфильтрованный список тасок (без удаленной id)
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodoList = tasks

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone) //t.isDone === false
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone) //t.isDone === true
    }

// Функция вывода тасок по статусу
// Принимает value статуса
// Возвращает отфильтрованный список тасок по статусу
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
