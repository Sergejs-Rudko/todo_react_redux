import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./appReducer";

let startState : InitialStateType

beforeEach(()=>{
    startState = {
        error : "yo",
        status : "idle"
    }
})

test("correct error message should be set", () => {
    const action = setAppErrorAC(null)
    const endState = appReducer(startState,action)

    expect(endState.error).toBe(null)
})

test("correct status should be applied", ()=> {
    const action = setAppStatusAC("loading")
    const endState = appReducer(startState,action)

    expect(endState.status).toBe("loading")
})