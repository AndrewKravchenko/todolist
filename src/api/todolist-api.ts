import axios from "axios";

export const settings = {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "bdcd7774-e172-45f7-88a2-0d88a8171b02"
    }
}

const instance = axios.create({
        ...settings
    }
)

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<D = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title}, settings)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`, settings)
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{item: TodolistType}>>(`todo-lists`, {title}, settings)
    },
    postTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`, settings)
    }
}
