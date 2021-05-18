import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/tasks-api';
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useSelector} from 'react-redux'
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type PropsType = {
    demo?: boolean
}

const App = React.memo(({demo = false}: PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

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

            { status === 'loading' && <LinearProgress color="secondary" />}

            <Container fixed={true}>
                <TodolistsList demo={demo}/>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
})


export default App


