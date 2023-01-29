import React, { useReducer, createContext, useEffect } from "react"

export enum ActionTypes {
    ACTIVED = "ACTIVED",
    UNACTIVED = "UNACTIVED"
}   

type ActionType = {
    type : ActionTypes.ACTIVED | ActionTypes.UNACTIVED,
    payload? : any
}

const initialState = {
    isActive : {
        chat : true,
        people : false
    }
}

export type ContextType = {
    state : InferType<typeof initialState>,
    dispatch : React.Dispatch<ActionType>
}

export const GlobalContext = createContext<ContextType | null>(null)

type InferType<T> = T extends infer R ? R : T

const reducers = (state : InferType<typeof initialState>, action: ActionType ) : InferType<typeof initialState> => {
    switch(action.type) {
        case ActionTypes.ACTIVED : 
            return {
                ...state, 
                isActive : {
                    chat : true,
                    people : false
                }
            }
        case ActionTypes.UNACTIVED : 
            return {
                ...state, 
                isActive : {
                    chat : false,
                    people : true
                }
            }
        default :   
            return state
    }
}

const GlobalLayout : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducers, initialState)

    const values = {
        state,
        dispatch,
    }

  return (
    <>
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    </>
  )
}

export default GlobalLayout