// import {TasksStateType} from "../App"
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType =
    {
        [todolistId1]: [
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                    startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                    startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                    startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
                },
                {
                    id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                    startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
                }
        ]
    }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(tl => tl.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
            // const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, status: action.status}
                    : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.newTitle}
                    : t)
            return ({...state})
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
            return state;
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
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    id,
    status,
    todolistId
}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    newTitle,
    todolistId,
    taskId
}) as const