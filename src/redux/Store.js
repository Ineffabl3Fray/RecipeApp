import {createContext, useReducer} from 'react'
import initialState from './initialState'
import recipeReducer from './reducers/recipeReducer'
import detailRecipeReducer from './reducers/detailRecipeReducer'
import { applyMiddleware, combineReducers} from 'redux';

export const CTX = createContext() 

const reducer = combineReducers({
    recipeReducer,
    detailRecipeReducer
})

export default function Store(props) {
    
    const reducerHook = useReducer(reducer, initialState)
    return(
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}