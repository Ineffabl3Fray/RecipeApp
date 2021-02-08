import {createContext, useReducer} from 'react'
import initialState from './initialState'
import recipeReducer from './reducers/recipeReducer'
import { applyMiddleware, combineReducers} from 'redux';

export const CTX = createContext() 

const reducer = combineReducers({
    recipeReducer,
})

export default function Store(props) {
    
    const reducerHook = useReducer(reducer, initialState)
    return(
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}