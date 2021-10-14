import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../state/appReducer";
import {ResponseType} from "../API/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>,dispatch : Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC("idle"))
    }else{
        dispatch(setAppErrorAC("unknown error occurred"))
        dispatch(setAppStatusAC("idle"))
    }
}

export const handleServerNetworkError = (error : { message : string }, dispatch : Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if(error.message) {
        dispatch(setAppErrorAC(error.message))
    }else{
        dispatch(setAppErrorAC("unknown error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}