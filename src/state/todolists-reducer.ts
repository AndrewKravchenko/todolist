import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api"
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
}) as const
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
}) as const
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    todolistId
}) as const
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todolistId
}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
}) as const

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.postTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}