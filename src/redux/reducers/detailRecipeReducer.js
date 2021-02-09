import initialState from '../initialState'

export default function detailRecipeReducer(state = initialState, action) {
    switch (action.type) {
        // case 'GET_RECIPE_DETAIL':
        //     return{
        //         ...state,
        //         detail: action.payload
        //     }
        default:
            return state;
    }
}