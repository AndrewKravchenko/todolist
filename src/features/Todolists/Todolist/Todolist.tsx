import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/tasks-api'
import {FilterValuesType} from '../todolists-reducer'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../tasks-reducer'
import {RequestStatusType} from '../../../app/app-reducer'

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: RequestStatusType
    demo?: boolean
}


const Todolist = React.memo(({demo = false, ...props}: TodolistType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasksTC(props.id))
        } else {
            return
        }
    }, [])

    const {
        id, changeFilter, addTask: addTaskFromProps, changeTodolistTitle: changetdltitle
    } = props

    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = useCallback((newTitle: string) => changetdltitle(id, newTitle), [changetdltitle, id])
    const addTask = useCallback((title: string) => addTaskFromProps(title, id), [addTaskFromProps, id])

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', id)
    }, [changeFilter, id])
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', id)
    }, [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', id)
    }, [changeFilter, id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}
                          disabled={props.entityStatus === 'loading'}/>
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodoList.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                    entityStatus={props.entityStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
            >Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
            >Completed
            </Button>
        </div>
    </div>
})

export default Todolist
