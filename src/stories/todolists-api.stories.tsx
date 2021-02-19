import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const promise = todolistAPI.postTodolist()
        promise.then((response) => {
            //ответ с сервера на запрос
            setState(response.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "NEW TODO"
        const api_key = "bdcd7774-e172-45f7-88a2-0d88a8171b02"
        const promise = todolistAPI.createTodolist(title)
        promise.then((response) => {
            //ответ с сервера на запрос
            setState(response.data.data.item);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "de759bfe-96ad-468c-9f7e-284c49c80482"
        const promise = todolistAPI.deleteTodolist(todolistId)
        promise.then((response) => {
            //ответ с сервера на запрос
            setState(response.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "0b32cc5e-7f01-4803-8f32-bda8d025dc11"
        const title = "React >>>!!!!"
        const promise = todolistAPI.updateTodolist(todolistId, title)
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
