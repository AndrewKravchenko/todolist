import React, {useEffect, useCallback} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress,
    CircularProgress
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TaskType} from '../api/tasks-api'
import {TodolistsList} from '../features/Todolists/TodolistsList'
import {useSelector, useDispatch} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType, initializeAppTC} from './app-reducer'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type PropsType = {
    demo?: boolean
}

const App = React.memo(({demo = false}: PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                </AppBar>

                {status === 'loading' && <LinearProgress color="secondary"/>}

                <Container fixed={true}>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                        <Route path={'/404'} render={() => <h1>404. Page not found</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
                <ErrorSnackbar/>
            </div>
        </BrowserRouter>
    )
})


export default App


