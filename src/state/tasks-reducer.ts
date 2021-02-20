import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId1,
    todolistId2
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
// export type UpdateTaskActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

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
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId]
            stateCopy[newTask.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'UPDATE-TASK': {
            const todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? {...t, ...action.model}
                    : t)
            return ({...state})
        }
        // case 'CHANGE-TASK-TITLE': {
        //     const todolistTasks = state[action.todolistId]
        //     state[action.todolistId] = todolistTasks
        //         .map(t => t.id === action.taskId
        //             ? {...t, title: action.newTitle}
        //             : t)
        //     return ({...state})
        // }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id] = []
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy;
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks

            return stateCopy

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
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    task
}) as const
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    id,
    model,
    todolistId
}) as const
// export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({
//     type: 'CHANGE-TASK-TITLE',
//     newTitle,
//     todolistId,
//     taskId
// }) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
}) as const

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}
export const deleteTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTasks(todolistId, title)
            .then((res) => {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
// export const changeTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === id)
//         if (!task) {
//             // throw new Error("task not found in the state")
//             console.warn("task not found in the state")
//             return
//         }
//
//         const apiModel: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: TaskPriorities.Low,
//             startDate: task.startDate,
//             title: task.title,
//             status
//         }
//
//         tasksAPI.updateTask(todolistId, id, model)
//
//             .then((res) => {
//                 dispatch(updateTaskAC(id, status, todolistId))
//             })
//     }
// }

export const updateTaskTC = (id: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === id)
        if (!task) {
            // throw new Error("task not found in the state")
            console.warn("task not found in the state")
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        tasksAPI.updateTask(todolistId, id, apiModel)

            .then((res) => {
                dispatch(updateTaskAC(id, domainModel, todolistId))
            })
    }
}
