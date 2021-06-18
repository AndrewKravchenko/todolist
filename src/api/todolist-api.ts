import axios from "axios";

const settings = {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "42c688ff-b242-4cda-ac99-6e02679c3ff4"
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

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<BaseResponseType<{userId?: number}>>('auth/login', data);
        return promise;
    },
    logout() {
        const promise = instance.delete<BaseResponseType<{userId?: number}>>('auth/login');
        return promise;
    },
    me() {
        const promise =  instance.get<BaseResponseType<{id: number; email: string; login: string}>>('auth/me');
        return promise
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

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}