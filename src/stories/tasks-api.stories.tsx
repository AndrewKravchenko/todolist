import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "6e74d942-3817-4246-959e-de7111ef8e1c"
        tasksAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    useEffect(() => {
        const todolistId = ""
        const taskId = ""
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((response) => {
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
        </div>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "6e74d942-3817-4246-959e-de7111ef8e1c"
        const title = "NEW TODO"
        tasksAPI.createTasks(todolistId, title).then((response) => {
            setState(response.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "6e74d942-3817-4246-959e-de7111ef8e1c"
        const taskId = "fbfc87fb-497d-44a6-8a09-20e2dc906170"
        tasksAPI.updateTasks(todolistId, taskId, {
            description: "description 100",
            title: "title 100",
            status: 2,
            priority: 3,
            startDate: "",
            deadline: ""
        })
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
