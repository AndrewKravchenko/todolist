import axios from "axios";

const settings = {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "bdcd7774-e172-45f7-88a2-0d88a8171b02"
    }
}

export const instance = axios.create({
        ...settings
    })

// api
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    postTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    }
}

// types
export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}