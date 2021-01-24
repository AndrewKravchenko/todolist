import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

// Функция удаления тасок
// Принимает id удаляемой таски
// Возвращает отфильтрованный список тасок (без удаленной id)
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

// Функция добавления тасок
// Создает новый объект таски
// Возвращает новый массив со старыми тасками и новой таской в начале
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
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
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
