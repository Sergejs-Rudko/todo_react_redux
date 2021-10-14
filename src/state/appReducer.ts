const initialState: InitialStateType = {
    status: "idle",
    error: "okey"
}

// ACTIONS
export const setAppStatusAC = (status : RequestStatusTypes) => ({
    type : "APP/SET-STATUS",
    status,
}as const)

export const setAppErrorAC = (error : string | null) => ({
    type : "APP/SET-ERROR",
    error,
}as const)

export const appReducer = (state: InitialStateType = initialState, action: UnionActionType_APP_REDUCER) => {
    switch (action.type) {
        case "APP/SET-STATUS" : {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR" : {
            return {...state, error: action.error}
        }
        default : {
            return state
        }
    }
}

//TYPES
export type InitialStateType = {
    status: RequestStatusTypes
    error: string | null
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type RequestStatusTypes = "idle" | "loading" | "success" | "failed"
type UnionActionType_APP_REDUCER = SetAppErrorActionType | SetAppStatusActionType