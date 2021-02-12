import {TasksStateType} from "../App"
import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(tl => tl.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            const task = todolistTasks.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const todolistTasks = stateCopy[action.todolistId]
            const task = todolistTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = []
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD-TASK',
    title,
    todolistId
}) as const
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    id,
    isDone,
    todolistId
}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    newTitle,
    todolistId,
    taskId
}) as const
export const addTodolistAC = (todolistId: string) => ({
    type: 'ADD-TODOLIST',
    todolistId
}) as const
export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
}) as const