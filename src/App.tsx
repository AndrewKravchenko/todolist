import React, {useMemo, useState} from 'react'
import './App.css';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {v1} from "uuid";
import {Menu} from '@material-ui/icons';
import Todolist from "./Todolist";
import {TodolistType} from "./api/todolist-api";
import {TasksStateType} from "./AppWithRedux";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";
import {AddItemForm} from "./AddItemForm";


function App() {
    const TodoListMemo = useMemo(() => Todolist, []);

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
        ],
        [todolistId2]: [
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    })

    // Добавляет задание
    // Принимает title задания и id тудулиста
    // Добавляет таску в начало тудулиста по заданному id
    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(), title,
            status: TaskStatuses.New,
            todoListId: todolistId, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        }
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    // Изменяет статус таски
    // Принимает id таски, статус выполнения, id тудулиста
    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }

    // Изменяет title таски
    // Принимает id таски, id тудулиста
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    // Изменяет отображение тасок по статусу выполнения
    // Принимает статус таски, id тудулиста
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    // Удаляет таску
    // Принимает id таски, id тудулиста
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    // Добовляет тудулист
    // Принимает title тудулиста
    function addTodolist(title: string) {
        //Присваиваем тудулисту id
        let newTodolistId = v1()
        //Созздаем новый тудулист
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: "all", addedDate: "", order: 0}
        //Создаем новый массив тудулистов, добавив в начало новый тудулист
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    // Изменяет title тудулист
    // Принимает id и измененный title тудулиста
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

    // Удаляет тудулист
    // Принимает id тудулиста
    function removeTodolist(todolistId: string) {
        //Добавим в стейт список тудулистов, id которых не равны удаляемому
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //Удалим таски у удаляемого тудулиста из стейта где храним таски
        delete tasks[todolistId] //удаляем св-во объекта (массив тасок)
        //Сетаем в стэйт копию объекта, чтобы React перерисовал
        setTasks({...tasks})
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
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
                            }
                            return <Grid item key={tl.id}>
                                <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
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

export default App