import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithReducers () {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })

    // Добавляет задание
    // Принимает title задания и id тудулиста
    // Добавляет таску в начало тудулиста по заданному id
    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    // Изменяет статус таски
    // Принимает id таски, статус выполнения, id тудулиста
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }

    // Изменяет title таски
    // Принимает id таски, newTitle задания, id тудулиста
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    // Изменяет отображение тасок по статусу выполнения
    // Принимает статус таски, id тудулиста
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC(value, todolistId))
    }

    // Удаляет таску
    // Принимает id таски, id тудулиста
    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    // Добовляет тудулист
    // Принимает title тудулиста
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    // Изменяет title тудулист
    // Принимает id и измененный title тудулиста
    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolists(changeTodolistTitleAC(id, newTitle))
    }

    // Удаляет тудулист
    // Принимает id тудулиста
    function removeTodolist(todolistId: string) {
        dispatchToTasks(removeTodolistAC(todolistId))
        dispatchToTodolists(removeTodolistAC(todolistId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container={true} style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodoList = allTodolistTasks

                            if (tl.filter === "active") {
                                tasksForTodoList = allTodolistTasks.filter(t => !t.isDone) //t.isDone === false
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = allTodolistTasks.filter(t => t.isDone) //t.isDone === true
                            }
                            return <Grid item>
                                <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        addItem={addTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers