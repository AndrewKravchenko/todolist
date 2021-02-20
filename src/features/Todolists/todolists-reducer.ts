import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../api/todolist-api"
import {Dispatch} from "redux";


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            // const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER'        :
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state;
    }
}

// actions
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

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.postTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
