import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolistReducer";
import {taskReducer} from "./taskReducer";
import thunkMiddleWare from "redux-thunk";
import {appReducer} from "./appReducer";

let rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app : appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))


//@ts-ignore
window.store = store

