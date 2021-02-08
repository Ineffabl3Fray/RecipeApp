import initialState from '../initialState'

export default function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPE':
            return{
                ...state,
                recipe: action.payload
            }
        case 'GET_RECIPE_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}