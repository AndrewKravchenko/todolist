import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTasksTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import {TasksStateType} from "../../app/AppWithRedux";

export const TodolistsList: React.FC = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    // Добавляет задание
    // Принимает title задания и id тудулиста
    // Добавляет таску в начало тудулиста по заданному id
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])

    // Изменяет статус таски
    // Принимает id таски, статус выполнения, id тудулиста
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(id, {status}, todolistId))
    }, [dispatch])

    // Изменяет title таски
    // Принимает id таски, newTitle задания, id тудулиста
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [dispatch])

    // Изменяет отображение тасок по статусу выполнения
    // Принимает статус таски, id тудулиста
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])

    // Удаляет таску
    // Принимает id таски, id тудулиста
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTasksTC(id, todolistId))
    }, [dispatch])

    // Добовляет тудулист
    // Принимает title тудулиста
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    // Изменяет title тудулист
    // Принимает id и измененный title тудулиста
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTC(id, newTitle))
    }, [dispatch])

    // Удаляет тудулист
    // Принимает id тудулиста
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    return (
        <>
            <Grid container={true} style={{padding: "15px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container={true} spacing={5}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>)
}