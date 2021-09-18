import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";

let rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks : taskReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer)



//@ts-ignore
window.store = store

