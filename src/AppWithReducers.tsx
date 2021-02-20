import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import Todolist from "./Todolist";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(addTaskAC({
            title,
            todoListId: todolistId,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "id exists"
        }))
    }

    // Изменяет статус таски
    // Принимает id таски, статус выполнения, id тудулиста
    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(updateTaskAC(id, {status}, todolistId))
    }

    // Изменяет title таски
    // Принимает id таски, newTitle задания, id тудулиста
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(updateTaskAC(id, {title: newTitle}, todolistId))
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
        const action = addTodolistAC({
            id: v1(),
            addedDate: "",
            order: 0,
            title
        })
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
    )
}

export default AppWithReducers