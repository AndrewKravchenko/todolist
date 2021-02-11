import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ]
    })

    function removeTask(id: string, todolistId: string) {
        //Достаем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //Перезаписываем в этом объекте массив для нужного тудулиста отфильтрованным массивом
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        //Сетаем в стэйт копию объекта, чтобы React перерисовал
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        //Создаем новую таску
        let task = {id: v1(), title: title, isDone: true}
        let todolistTasks = tasks[todolistId]
        //Созаем новый массив таксок, добавив в начало новую таску
        tasks[todolistId] = [task, ...todolistTasks]
        //Сетаем в стэйт копию объекта, чтобы React перерисовал
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //Достаем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //Ищем нужную таску
        let task = todolistTasks.find(t => t.id === id)
        //Изменяем таску, если нашли
        if (task) {
            task.isDone = isDone
            //Сетаем в стэйт копию объекта, чтобы React перерисовал
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //Достаем нужный массив по todolistId
        let todolistTasks = tasks[todolistId]
        //Ищем нужную таску
        let task = todolistTasks.find(t => t.id === id)
        //Изменяем таску, если нашли
        if (task) {
            task.title = newTitle
            //Сетаем в стэйт копию объекта, чтобы React перерисовал
            setTasks({...tasks})
        }
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        //Ищем нужный тудулист
        let todolist = todolists.find(tl => tl.id === id)
        //Изменяем title, если нашли
        if (todolist) {
            todolist.title = newTitle
            //Сетаем в стэйт копию массива, чтобы React перерисовал
            setTodolists([...todolists])
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        //Ищем тудулист в котором нужно поменять значение фильтра
        let todolist = todolists.find(tl => tl.id === todolistId)
        //Изменяем фильтр, если нашли
        if (todolist) {
            todolist.filter = value
            //Сетаем в стэйт копию массива, чтобы React перерисовал
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        //Добавим в стейт список тудулистов, id которых не равны удаляемому
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //Удалим таски у удаляемого тудулиста из стейта где храним таски
        delete tasks[todolistId] //удаляем св-во объекта (массив тасок)
        //Сетаем в стэйт копию объекта, чтобы React перерисовал
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        //Присваиваем тудулисту id
        let newTodolistId = v1()
        //Созздаем новый тудулист
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        //Создаем новый массив тудулистов, добавив в начало новый тудулист
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
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
    );
}

export default App;