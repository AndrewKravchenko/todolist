import {instance} from './todolist-api'


// api
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<BaseResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

// types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}